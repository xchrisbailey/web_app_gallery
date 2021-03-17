const db = require('../db');
const userService = require('../../user/user.service');
const User = require('../../user/user.model');

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

const u = {
  firstName: 'chris',
  lastName: 'bailey',
  email: 'chris@example.com',
  password: 'qwe123',
};

describe('create user', () => {
  it('should return new user', async () => {
    const newUser = await userService.create(u);

    expect(newUser.firstName).toBe(u.firstName);
    expect(newUser.lastName).toBe(u.lastName);
    expect(newUser.email).toBe(u.email);
    expect(newUser._id).not.toBeNull();
  });

  it('should error with missing fields', async () => {
    try {
      const newUser = await userService.create({
        ...u,
        firstName: '',
      });
      expect(newUser).toBeUndefined();
    } catch (e) {
      expect(e.message).toBe(
        'User validation failed: firstName: first name is required',
      );
    }
  });

  it('should error when password is too short', async () => {
    try {
      const newUser = await userService.create({
        ...u,
        password: '123',
      });

      expect(newUser).toBeUndefined();
    } catch (e) {
      expect(e.message).toBe(
        'User validation failed: password: password must be at least 6 characters long',
      );
    }
  });

  it('should error when email is invalid', async () => {
    try {
      const newUser = await userService.create({
        ...u,
        email: 'chrisexamplecom',
      });

      expect(newUser).toBeUndefined();
    } catch (e) {
      expect(e.message).toBe(
        'User validation failed: email: invalid email address',
      );
    }
  });

  it('should not allow duplicate email addresses', async () => {
    try {
      await userService.create(u);
      await userService.create(u);
    } catch (e) {
      expect(e.message).toContain('duplicate key');
    }
  });
});

describe('login', () => {
  it('should return user when given proper credentials', async () => {
    const lu = await userService.create(u);
    const res = await userService.login(u.email, u.password);
    expect(res.firstName).toBe(lu.firstName);
    expect(res.lastName).toBe(lu.lastName);
    expect(res.email).toBe(lu.email);
    expect(res._id.toString()).toBe(lu._id.toString());
  });

  it('should error when email not found', async () => {
    try {
      await userService.login('joe@sam.com', 'qwe123');
    } catch (e) {
      expect(e.message).toBe('Email not found');
    }
  });

  it('should error when passwords do not match', async () => {
    try {
      await userService.create(u);
      await userService.login(u.email, 'zxc123');
    } catch (e) {
      expect(e.message).toBe('Invalid login credentials');
    }
  });
});

describe('update', () => {
  it('should update valid fields', async () => {
    const lu = await userService.create(u);

    let res = await userService.update(lu, { firstName: 'christopher' });
    expect(res.firstName).toBe('christopher');

    res = await userService.update(lu, { email: 'christopher@example.com' });
    expect(res.email).toBe('christopher@example.com');

    res = await userService.update(lu, { lastName: 'johnson' });
    expect(res.lastName).toBe('johnson');
  });

  it('should error when invalid update sent', async () => {
    try {
      const lu = await userService.create(u);
      await userService.update(lu, { password: 'zxc123' });
    } catch (e) {
      expect(e.message).toBe('No valid updates provided');
    }
  });
});

describe('updatePass', () => {
  it('should update as users password', async () => {
    const lu = await userService.create(u);
    let res = await userService.updatePass(lu, 'zxc123');

    try {
      await userService.login(u.email, u.password);
    } catch (e) {
      expect(e.message).toBe('Invalid login credentials');
    }

    res = await userService.login(u.email, 'zxc123');
    expect(res.email).toBe(lu.email);
  });
});

describe('remove', () => {
  it('should delete requested account', async () => {
    const lu = await userService.create(u);
    expect(await userService.remove(lu)).toBeTruthy();

    const check = await User.findById(lu._id);
    expect(check).toBeNull();
  });
});
