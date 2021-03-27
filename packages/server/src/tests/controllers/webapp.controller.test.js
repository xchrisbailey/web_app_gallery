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
  const manifestURL = 'https://sports.yahoo.com/manifest.json';

  const manifestSampleData = {
    name: 'Yahoo Sports',
    short_name: 'Yahoo Sports',
    start_url: '/?utm_source=a2hs',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    display: 'minimal-ui',
    orientation: 'portrait',
    gcm_sender_id: '972471620958',
    prefer_related_applications: true,
    icons: [
      {
        sizes: '48x48',
        src: 'https://s.yimg.com/cv/apiv2/sports/web/app/Sports_48.png',
        type: 'image/png',
      },
      {
        sizes: '72x72',
        src: 'https://s.yimg.com/cv/apiv2/sports/web/app/Sports_72.png',
        type: 'image/png',
      },
      {
        sizes: '96x96',
        src: 'https://s.yimg.com/cv/apiv2/sports/web/app/Sports_96.png',
        type: 'image/png',
      },
      {
        sizes: '114x114',
        src: 'https://s.yimg.com/cv/apiv2/sports/web/app/Sports_114.png',
        type: 'image/png',
      },
      {
        sizes: '128x128',
        src: 'https://s.yimg.com/cv/apiv2/sports/web/app/Sports_128.png',
        type: 'image/png',
      },
      {
        sizes: '144x144',
        src: 'https://s.yimg.com/cv/apiv2/sports/web/app/Sports_144.png',
        type: 'image/png',
      },
      {
        sizes: '152x152',
        src: 'https://s.yimg.com/cv/apiv2/sports/web/app/Sports_152.png',
        type: 'image/png',
      },
      {
        sizes: '192x192',
        src: 'https://s.yimg.com/cv/apiv2/sports/web/app/Sports_192.png',
        type: 'image/png',
      },
      {
        sizes: '384x384',
        src: 'https://s.yimg.com/cv/apiv2/sports/web/app/Sports_384.png',
        type: 'image/png',
      },
      {
        sizes: '512x512',
        src: 'https://s.yimg.com/cv/apiv2/sports/web/app/Sports_512.png',
        type: 'image/png',
      },
    ],
  };

  it('should 201 and create new application', async () => {
    const req = mockRequest();
    req.body.manifestUrl = manifestURL;
    const res = mockResponse();

    await webAppController.createWebApp(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.body.data).toHaveBeenCalledWith(
      expect.objectContaining({
        start_url: manifestSampleData.start_url,
        name: manifestSampleData.name,
        short_name: manifestSampleData.short_name,
        background_color: manifestSampleData.background_color,
        theme_color: manifestSampleData.theme_color,
      }),
    );
  });

  it('should 400 if data cannot be retreived from manifest', async () => {
    const req = mockRequest();
    req.body.manifestUrl = '';
    const res = mockResponse();

    await webAppController.createWebApp(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'error',
        message: 'error processing manifest url',
      }),
    );
  });

  it('should 400 if no manifest url provided', async () => {
    const req = mockRequest();
    req.body.manifestUrl = '';
    const res = mockResponse();

    await webAppController.createWebApp(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'error',
        message: 'must provide a manifest url',
      }),
    );
  });
});
