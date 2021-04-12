require('dotenv').config();

const db = require('../../test/db');
const { dummyUser } = require('../../test/data');
const { mockRequest, mockResponse } = require('../../test/utils/interceptors');
const userController = require('./user.controller');
const userService = require('./user.service');

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

afterEach(() => {
  jest.clearAllMocks();
});

describe('createUser', () => {
  it('should 201 and return correct value', async () => {
    const req = mockRequest();
    req.body = dummyUser;
    const res = mockResponse();
    const userServiceSpy = jest.spyOn(userService, 'create');

    await userController.createUser(req, res);

    expect(userServiceSpy).toHaveBeenCalledWith(dummyUser);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ok' }),
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ email: dummyUser.email }),
      }),
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ firstName: dummyUser.firstName }),
      }),
    );
  });

  it('should 400 when missing data', async () => {
    const invalidUser = {
      ...dummyUser,
      lastName: '',
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
      'User validation failed: lastName: Path `lastName` is required.',
    );
  });
});

describe('loginUser', () => {
  it('should 200 and return user and auth cookie', async () => {
    await userService.create(dummyUser);

    const req = mockRequest();
    req.body = { email: dummyUser.email, password: dummyUser.password };
    const res = mockResponse();
    const userServiceSpy = jest.spyOn(userService, 'login');

    await userController.loginUser(req, res);

    expect(userServiceSpy).toHaveBeenCalledWith(
      dummyUser.email,
      dummyUser.password,
    );
    expect(res.cookie).toHaveBeenCalledTimes(1);
    expect(res.cookie.token).not.toBeNull();
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ok' }),
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ email: dummyUser.email }),
      }),
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ firstName: dummyUser.firstName }),
      }),
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ lastName: dummyUser.lastName }),
      }),
    );
  });

  it('should 400 and return error when invalid login', async () => {
    await userService.create(dummyUser);

    const req = mockRequest();
    req.body = { email: dummyUser.email, password: 'zxc123' };
    const res = mockResponse();
    const userServiceSpy = jest.spyOn(userService, 'login');

    await userController.loginUser(req, res);

    expect(userServiceSpy).toHaveBeenCalledWith(dummyUser.email, 'zxc123');
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
    req.user = dummyUser;
    const res = mockResponse();

    userController.getProfile(req, res);

    expect(res.json).toBeCalledWith(
      expect.objectContaining({ status: 'ok', data: dummyUser }),
    );
  });
});

describe('deleteUser', () => {
  it('should 200 and return success message', async () => {
    const user = await userService.create(dummyUser);

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

    const user = await userService.create(dummyUser);

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
});

describe('updatePassword', () => {
  it('should send user and new password to user service', async () => {
    const user = await userService.create(dummyUser);

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
    const user = await userService.create(dummyUser);

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
      'User validation failed: password: Path `password` is required.',
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
