require('dotenv').config();

const db = require('../../test/db');
const { mockRequest, mockResponse } = require('../../test/utils/interceptors');
const userController = require('./user.controller');
const userService = require('./user.service');

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

afterEach(() => {
  jest.clearAllMocks();
});

const newUser = {
  email: 'chris@example.com',
  firstName: 'chris',
  lastName: 'bailey',
  password: 'qwe123',
};

describe('createUser', () => {
  it('should 201 and return correct value', async () => {
    const req = mockRequest();
    req.body = newUser;
    const res = mockResponse();
    const userServiceSpy = jest.spyOn(userService, 'create');

    await userController.createUser(req, res);

    expect(userServiceSpy).toHaveBeenCalledWith(newUser);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ok' }),
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ email: newUser.email }),
      }),
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ firstName: newUser.firstName }),
      }),
    );
  });

  it('should 400 when missing data', async () => {
    const invalidUser = {
      email: 'chris@example.com',
      firstName: 'chris',
      password: 'qwe123',
    };

    const req = mockRequest();
    req.body = invalidUser;
    const res = mockResponse();
    const userServiceSpy = jest.spyOn(userService, 'create');

    await userController.createUser(req, res);

    expect(userServiceSpy).toHaveBeenCalledWith(invalidUser);
    assertError(
      res,
      400,
      'User validation failed: lastName: last name is required',
    );
  });
});

describe('loginUser', () => {
  it('should 200 and return user and auth cookie', async () => {
    await userService.create(newUser);

    const req = mockRequest();
    req.body = { email: newUser.email, password: newUser.password };
    const res = mockResponse();
    const userServiceSpy = jest.spyOn(userService, 'login');

    await userController.loginUser(req, res);

    expect(userServiceSpy).toHaveBeenCalledWith(
      newUser.email,
      newUser.password,
    );
    expect(res.cookie).toHaveBeenCalledTimes(1);
    expect(res.cookie.token).not.toBeNull();
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ok' }),
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ email: newUser.email }),
      }),
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ firstName: newUser.firstName }),
      }),
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ lastName: newUser.lastName }),
      }),
    );
  });

  it('should 400 and return error when invalid login', async () => {
    await userService.create(newUser);

    const req = mockRequest();
    req.body = { email: newUser.email, password: 'zxc123' };
    const res = mockResponse();
    const userServiceSpy = jest.spyOn(userService, 'login');

    await userController.loginUser(req, res);

    expect(userServiceSpy).toHaveBeenCalledWith(newUser.email, 'zxc123');
    expect(res.cookie).toHaveBeenCalledTimes(0);
    expect(res.cookie.token).toBeUndefined();
    assertError(res, 400, 'Invalid login credentials');
  });
});

describe('logoutUser', () => {
  it('should 200 and clear auth cookie', async () => {
    const req = mockRequest();
    const res = mockResponse();

    userController.logoutUser(req, res);

    expect(res.clearCookie).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ok' }),
    );
  });
});

describe('getProfile', () => {
  it('should 200 and return user profile', async () => {
    const req = mockRequest();
    req.user = newUser;
    const res = mockResponse();

    userController.getProfile(req, res);

    expect(res.json).toBeCalledWith(
      expect.objectContaining({ status: 'ok', data: newUser }),
    );
  });
});

describe('deleteUser', () => {
  it('should 200 and return success message', async () => {
    const user = await userService.create(newUser);

    const req = mockRequest();
    req.user = user;
    const res = mockResponse();
    const userServiceSpy = jest.spyOn(userService, 'remove');

    await userController.deleteUser(req, res);

    expect(userServiceSpy).toHaveBeenCalledWith(user);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toBeCalledWith({
      status: 'ok',
      data: { message: 'Account successfully removed' },
    });
  });
});

describe('updateUser', () => {
  it('should send user and requested updates to user service', async () => {
    const updates = {
      email: 'chris2@example.com',
      firstName: 'christopher',
    };

    const user = await userService.create(newUser);

    const req = mockRequest();
    req.user = user;
    req.body = updates;
    const res = mockResponse();
    const userServiceSpy = jest.spyOn(userService, 'update');

    await userController.updateUser(req, res);

    expect(userServiceSpy).toHaveBeenCalledWith(user, updates);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ok' }),
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ ...user, ...updates }),
      }),
    );
  });

  it('should return 400 if no valid update fields provided', async () => {
    const user = await userService.create(newUser);

    const req = mockRequest();
    req.user = user;
    req.body = {};
    const res = mockResponse();
    const userServiceSpy = jest.spyOn(userService, 'update');

    await userController.updateUser(req, res);

    expect(userServiceSpy).toHaveBeenCalledWith(user, {});
    assertError(res, 400, 'No valid updates provided');
  });
});

describe('updatePassword', () => {
  it('should send user and new password to user service', async () => {
    const user = await userService.create(newUser);

    const req = mockRequest();
    req.user = user;
    req.body = { newPassword: 'zxc123' };
    const res = mockResponse();
    const userServiceSpy = jest.spyOn(userService, 'updatePass');

    await userController.updatePassword(req, res);

    expect(userServiceSpy).toHaveBeenCalledWith(user, 'zxc123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      status: 'ok',
      data: { message: 'Password successfully updated' },
    });
  });

  it('should return 400 if update could not be performed', async () => {
    const user = await userService.create(newUser);

    const req = mockRequest();
    req.user = user;
    req.body = { newPassword: '' };
    const res = mockResponse();
    const userServiceSpy = jest.spyOn(userService, 'updatePass');

    await userController.updatePassword(req, res);

    expect(userServiceSpy).toHaveBeenCalledWith(user, '');
    assertError(
      res,
      400,
      'User validation failed: password: password is required',
    );
  });
});

const assertError = (res, status, message) => {
  expect(res.status).toHaveBeenCalledWith(status);
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledWith({
    status: 'error',
    message: message,
  });
};
