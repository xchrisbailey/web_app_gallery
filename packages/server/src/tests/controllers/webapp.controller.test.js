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
