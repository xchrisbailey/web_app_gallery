const supertest = require('supertest');

const db = require('../../test/db');
const app = require('../app');

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
