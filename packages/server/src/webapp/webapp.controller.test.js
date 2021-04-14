require('dotenv').config();

const axios = require('axios');
const mongoose = require('mongoose');

const db = require('../../tests/db');
const {
  dummyWebApp,
  dummyGoogleManifest,
  dummyGoogleHtml,
  dummyUser,
} = require('../../tests/data');
const { mockRequest, mockResponse } = require('../../tests/utils/interceptors');
const { User } = require('../user');
const { WebApp } = require('.');
const webAppController = require('./webapp.controller.js');

jest.mock('axios');

axios.get.mockImplementation((u) => {
  if (u.match(/\.json$/)) {
    return Promise.resolve({ data: dummyGoogleManifest });
  } else if (u === '' || !u) {
    return Promise.reject(new Error('not found'));
  } else {
    return Promise.resolve({ data: dummyGoogleHtml });
  }
});

let user;

beforeAll(async () => await db.connect());
beforeEach(async () => {
  await db.clear();
  user = await User.create(dummyUser);
});
afterAll(async () => {
  await db.clear();
  await db.close();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('requests single web app', () => {
  it('should 200 and return the web app', async () => {
    const app = await WebApp.create({ ...dummyWebApp, submittedBy: user });

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
      const manifestURL = `${dummyWebApp.manifestURL}/${i}`;
      await WebApp.create({ ...dummyWebApp, manifestURL, submittedBy: user });
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
      expect.objectContaining({ limit: 2 }),
    );
  });

  it('should 200 and return requested page', async () => {
    for (let i = 0; i < 10; i++) {
      const manifestURL = `${dummyWebApp.manifestURL}/${i}`;
      await WebApp.create({ ...dummyWebApp, manifestURL, submittedBy: user });
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
        page: 2,
        nextPage: 3,
        prevPage: 1,
      }),
    );
  });

  it('should 200 and return matching search results', async () => {
    await WebApp.create({ ...dummyWebApp, submittedBy: user });
    await WebApp.create({
      ...dummyWebApp,
      manifestURL: 'test',
      name: 'apple',
      submittedBy: user,
    });

    const req = mockRequest();
    req.query.search = 'google';
    const res = mockResponse();

    await webAppController.getWebApps(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ data: [expect.anything()] }),
    );
  });

  it('should 200 and return matching category results', async () => {
    await WebApp.create(dummyWebApp);
    await WebApp.create({
      ...dummyWebApp,
      manifestURL: 'test',
      category: 'news',
    });

    const req = mockRequest();
    req.query.category = 'news';
    const res = mockResponse();

    await webAppController.getWebApps(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ data: [expect.anything()] }),
    );
  });

  it('should 400 and return error if page does not exist', async () => {
    for (let i = 0; i < 10; i++) {
      const manifestURL = `${dummyWebApp.manifestURL}/${i}`;
      await WebApp.create({ ...dummyWebApp, manifestURL, submittedBy: user });
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
  const appUrl = 'https://news.google.com';

  it('should 201 and create new application', async () => {
    const req = mockRequest();
    req.body.appUrl = appUrl;
    req.body.category = 'news';
    req.user = user;
    const res = mockResponse();

    await webAppController.createWebApp(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ok' }),
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          startURL: dummyGoogleManifest.start_url,
        }),
      }),
    );
  });

  it('should 400 if no valid category provided', async () => {
    const req = mockRequest();
    req.body.appUrl = appUrl;
    req.body.category = '';
    req.user = user;
    const res = mockResponse();

    await webAppController.createWebApp(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'error',
        message:
          'WebApp validation failed: category: Path `category` is required.',
      }),
    );
  });

  it('should 400 if data cannot be retreived from manifest', async () => {
    const req = mockRequest();
    req.body.manifestUrl = '';
    req.user = user;
    const res = mockResponse();

    await webAppController.createWebApp(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'error' }),
    );
  });
});
