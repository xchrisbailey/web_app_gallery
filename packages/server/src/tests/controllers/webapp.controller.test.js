require('dotenv').config();

const mongoose = require('mongoose');

const db = require('../db');
const { mockRequest, mockResponse } = require('../utils/interceptors');
const WebApp = require('../../webapp/webapp.model');
const webAppController = require('../../webapp/webapp.controller.js');

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

const sampleWebApp = {
  manifestURL: 'https://maps.google.com',
  startURL: 'https://maps.google.com',
  name: 'google maps',
  description: 'mobile maps',
  appleMobileWebCapable: true,
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('requests single web app', () => {
  it('should return 200 and web app', async () => {
    const app = await WebApp.create(sampleWebApp);

    const req = mockRequest();
    req.params.id = app._id;
    const res = mockResponse();

    await webAppController.getWebApp(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'ok',
        data: expect.objectContaining({ _id: app._id }),
      }),
    );
  });

  it('should 400 and return error if web app not found', async () => {
    const req = mockRequest();
    req.params.id = mongoose.Types.ObjectId();
    const res = mockResponse();

    await webAppController.getWebApp(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'web app not found',
    });
  });

  it('should 400 and return error if no ID provided', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await webAppController.getWebApp(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'must provide a application id',
    });
  });
});

describe('get list of web applications', () => {
  it('should 200 and return list of web applications', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await webAppController.getWebApps(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ok' }),
    );
  });

  it('should 200 and set return limit', async () => {
    for (let i = 0; i < 10; i++) {
      await WebApp.create(sampleWebApp);
    }

    const req = mockRequest();
    req.query.limit = 2;
    const res = mockResponse();

    await webAppController.getWebApps(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ok' }),
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ limit: 2 }) }),
    );
  });

  it('should 200 and return requested page', async () => {
    for (let i = 0; i < 10; i++) {
      await WebApp.create(sampleWebApp);
    }

    const req = mockRequest();
    req.query.limit = 2;
    req.query.page = 2;
    const res = mockResponse();

    await webAppController.getWebApps(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ok' }),
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ page: 2, nextPage: 3, prevPage: 1 }),
      }),
    );
  });

  it('should 400 and return error if page does not exist', async () => {
    for (let i = 0; i < 10; i++) {
      await WebApp.create(sampleWebApp);
    }

    const req = mockRequest();
    req.query.limit = 2;
    req.query.page = 200;
    const res = mockResponse();

    await webAppController.getWebApps(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'error',
        message: 'no applications found',
      }),
    );
  });
});
