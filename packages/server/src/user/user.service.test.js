const faker = require('faker');

const db = require('../../tests/db');
const { dummyUser } = require('../../tests/data');
const userService = require('./user.service');
const User = require('./user.model');

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('create user', () => {
  it('should return new user', async () => {
    const newUser = await userService.create(dummyUser);

    expect(newUser.firstName).toBe(dummyUser.firstName.toLowerCase());
    expect(newUser.lastName).toBe(dummyUser.lastName.toLowerCase());
    expect(newUser.email).toBe(dummyUser.email.toLowerCase());
    expect(newUser._id).not.toBeNull();
  });

  it('should error with missing fields', async () => {
    try {
      const newUser = await userService.create({
        ...dummyUser,
        firstName: '',
      });
      expect(newUser).toBeUndefined();
    } catch (e) {
      expect(e.message).toBe(
        'User validation failed: firstName: Path `firstName` is required.',
      );
    }
  });

  it('should error when password is too short', async () => {
    try {
      const newUser = await userService.create({
        ...dummyUser,
        password: '123',
      });

      expect(newUser).toBeUndefined();
    } catch (e) {
      expect(e.message).toBe(
        'User validation failed: password: Path `password` (`123`) is shorter than the minimum allowed length (6).',
      );
    }
  });

  it('should error when email is invalid', async () => {
    try {
      const newUser = await userService.create({
        ...dummyUser,
        email: 'chrisexamplecom',
      });

      expect(newUser).toBeUndefined();
    } catch (e) {
      expect(e.message).toBe('User validation failed: email: Invalid email');
    }
  });

  it('should not allow duplicate email addresses', async () => {
    try {
      await userService.create(dummyUser);
      await userService.create(dummyUser);
    } catch (e) {
      expect(e.message).toBe('Email address already in use');
    }
  });
});

describe('login', () => {
  it('should return user when given proper credentials', async () => {
    const lu = await userService.create(dummyUser);
    const res = await userService.login(dummyUser.email, dummyUser.password);
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
      await userService.create(dummyUser);
      await userService.login(dummyUser.email, faker.internet.password());
    } catch (e) {
      expect(e.message).toBe('Invalid login credentials');
    }
  });
});

describe('update', () => {
  it('should update valid fields', async () => {
    const lu = await userService.create(dummyUser);

    let res = await userService.update(lu, { firstName: 'christopher' });
    expect(res.firstName).toBe('christopher');

    res = await userService.update(lu, { email: 'christopher@example.com' });
    expect(res.email).toBe('christopher@example.com');

    res = await userService.update(lu, { lastName: 'johnson' });
    expect(res.lastName).toBe('johnson');
  });

  it('should error when invalid update sent', async () => {
    try {
      const lu = await userService.create(dummyUser);
      await userService.update(lu, { password: faker.internet.password() });
    } catch (e) {
      expect(e.message).toBe('No valid updates provided');
    }
  });
});

describe('updatePass', () => {
  it('should update a users password', async () => {
    const lu = await User.create(dummyUser);
    const newPassword = faker.internet.password();
    let res = await userService.updatePass(lu, newPassword);

    try {
      await userService.login(dummyUser.email, dummyUser.password);
    } catch (e) {
      expect(e.message).toBe('Invalid login credentials');
    }

    res = await userService.login(dummyUser.email, newPassword);
    expect(res.email).toBe(lu.email);
  });
});

describe('remove', () => {
  it('should delete requested account', async () => {
    const lu = await userService.create(dummyUser);
    expect(await userService.remove(lu)).toBeTruthy();

    const check = await User.findById(lu._id);
    expect(check).toBeNull();
  });
});
