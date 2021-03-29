require('dotenv').config();

const mongoose = require('mongoose');
const axios = require('axios');

const db = require('../db');
const { mockRequest, mockResponse } = require('../utils/interceptors');
const WebApp = require('../../webapp/webapp.model');
const webAppController = require('../../webapp/webapp.controller.js');

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());
afterEach(() => jest.resetAllMocks());

jest.mock('axios');

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
  it('should 200 and return the web app', async () => {
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

describe('create new web application', () => {
  const manifestURL = 'https://news.google.com/_/DotsSplashUi/manifest.json';

  const manifestSampleData = {
    name: 'Google News',
    short_name: 'News',
    start_url: '/?lfhs=2',
    display: 'standalone',
    theme_color: 'white',
  };

  it('should 201 and create new application', async () => {
    const req = mockRequest();
    req.body.manifestURL = manifestURL;
    req.body.description = 'Yahoo sports application';
    const res = mockResponse();

    axios.get.mockImplementation(() =>
      Promise.resolve({ data: manifestSampleData }),
    );

    await webAppController.createWebApp(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ok' }),
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          startURL: manifestSampleData.start_url,
        }),
      }),
    );
  });

  it('should 400 if data cannot be retreived from manifest', async () => {
    const req = mockRequest();
    req.body.manifestUrl = '';
    const res = mockResponse();

    await webAppController.createWebApp(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'error' }),
    );
  });

  it('should 400 when missing required data', async () => {
    const req = mockRequest();
    req.body.manifestURL = manifestURL;
    const res = mockResponse();

    await webAppController.createWebApp(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'error' }),
    );
  });
});
