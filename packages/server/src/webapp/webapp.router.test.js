const supertest = require('supertest');
const mongoose = require('mongoose');

const db = require('../../test/db');
const app = require('../app');
const { dummyWebApp } = require('../../test/data');
const WebApp = require('./webapp.model');

const request = supertest(app);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('POST /webapp', () => {
  it('should create and return new web application', async () => {
    const res = await request
      .post('/api/webapp')
      .send({ appUrl: 'https://news.google.com' })
      .expect(201);

    expect(res.body.status).toBe('ok');
    expect(res.body.data.description).not.toBe('');
  });

  it('should return error when url not provided', async () => {
    const res = await request.post('/api/webapp').send({}).expect(400);

    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('url cannot be empty');
  });
});

describe('GET /webapp/:id', () => {
  it('should return single webapp', async () => {
    const testApp = await WebApp.create(dummyWebApp);
    const req = await request.get(`/api/webapp/${testApp._id}`).expect(200);
    expect(req.body.status).toBe('ok');
    expect(req.body.data.manifestURL).toEqual(testApp.manifestURL);
    expect(req.body.data.name).toEqual(testApp.name);
  });

  it('should should return error when app does not exist', async () => {
    const req = await request
      .get(`/api/webapp/${mongoose.Types.ObjectId()}`)
      .expect(400);
    expect(req.body.status).toBe('error');
    expect(req.body.message).toBe('web app not found');
  });
});

describe('GET /webapp', () => {
  it('should return list of webapps', async () => {
    for (let i = 0; i < 20; i++) {
      await WebApp.create(dummyWebApp);
    }

    const req = await request.get('/api/webapp').expect(200);
    expect(req.body.status).toBe('ok');
    expect(req.body.data.length).toBe(10); // default limit
  });

  it('should error with out of bound query page', async () => {
    for (let i = 0; i < 20; i++) {
      await WebApp.create(dummyWebApp);
    }

    const req = await request.get('/api/webapp?page=5').expect(400);
    expect(req.body.status).toBe('error');
  });

  it('should return specified limit of webapps and requested page', async () => {
    for (let i = 0; i < 20; i++) {
      await WebApp.create(dummyWebApp);
    }

    const req = await request.get('/api/webapp?limit=5&page=2').expect(200);
    expect(req.body.status).toBe('ok');
    expect(req.body.data.length).toBe(5);
    expect(req.body.page).toBe(2);
  });
});
