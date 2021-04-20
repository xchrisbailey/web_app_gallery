const supertest = require('supertest');
const mongoose = require('mongoose');

const db = require('../../tests/db');
const app = require('../app');
const { dummyWebApp, dummyUser } = require('../../tests/data');
const WebApp = require('../webapp/webapp.model');
const User = require('../user/user.model');

let webapp;

beforeAll(async () => await db.connect());
beforeEach(async () => {
  await db.clear();
  await User.create(dummyUser);
  webapp = await WebApp.create(dummyWebApp);
});

afterAll(async () => await db.close());

describe('POST /webapp/:id/review', () => {
  it('should create a new review and return ok', async () => {
    const r = supertest.agent(app);
    await r
      .post('/api/login')
      .send({ email: dummyUser.email, password: dummyUser.password })
      .expect(200);

    const res = await r
      .post(`/api/webapp/${webapp._id}/reviews`)
      .send({ rating: 3, review: 'it kinda works' })
      .expect(201);

    expect(res.body.status).toBe('ok');
    expect(res.body.data.rating).toBe(3);
  });

  it('should error when missing a rating', async () => {
    const r = await createAuthorizedSession();

    const res = await r
      .post(`/api/webapp/${webapp._id}/reviews`)
      .send({ review: 'it kinda works' })
      .expect(400);

    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('"rating" is required');
  });
});

describe('PUT /review/:reviewId', () => {
  it('should update a valid review with valid data', async () => {
    const r = await createAuthorizedSession();
    const review = await createReview(r);

    const res = await r
      .put(`/api/review/${review.body.data._id}`)
      .send({ rating: 4 })
      .expect(201);

    expect(res.body.status).toBe('ok');
    expect(res.body.data.rating).toBe(4);
  });

  it('should return error with invalid data', async () => {
    const r = await createAuthorizedSession();
    const review = await createReview(r);

    const res = await r
      .put(`/api/review/${review.body.data._id}`)
      .send({ rating: 'hello' })
      .expect(400);

    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('"rating" must be a number');
  });

  it('should not allow non owner to update', async () => {
    const r = await createAuthorizedSession();
    const review = await createReview(r);

    const rn = supertest.agent(app);
    await rn
      .post('/api/signup')
      .send({ ...dummyUser, email: 'example@example.com' })
      .expect(201);

    const res = await rn
      .put(`/api/review/${review.body.data._id}`)
      .send({ rating: 4 })
      .expect(400);

    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('unable to update this review');
  });
});

describe('DELETE /review/:reviewId', () => {
  it('should delete the requested review when authorized', async () => {
    const r = await createAuthorizedSession();
    const review = await createReview(r);

    const res = await r
      .delete(`/api/review/${review.body.data._id}`)
      .expect(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.message).toBe('review successfully removed');
  });

  it('should error when not the owner', async () => {
    const r = await createAuthorizedSession();
    const review = await createReview(r);

    const rn = supertest.agent(app);
    await rn
      .post('/api/signup')
      .send({ ...dummyUser, email: 'example@example.com' })
      .expect(201);

    const res = await rn
      .delete(`/api/review/${review.body.data._id}`)
      .expect(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('review could not be removed');
  });

  it('should error if review doesnt exist', async () => {
    const r = await createAuthorizedSession();

    const res = await r
      .delete(`/api/review/${mongoose.Types.ObjectId()}`)
      .expect(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('review could not be removed');
  });
});

describe('GET /api/me/reviews', () => {
  it('should return logged in users reviews', async () => {
    const r = await createAuthorizedSession();
    await createReview(r);

    const rn = supertest.agent(app);
    await rn
      .post('/api/signup')
      .send({ ...dummyUser, email: 'example@example.com' })
      .expect(201);

    await createReview(rn);

    const res = await r.get('/api/me/reviews').send().expect(200);

    expect(res.body.status).toBe('ok');
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].rating).toBe(3);
  });
});

const createAuthorizedSession = async () => {
  const r = supertest.agent(app);
  await r
    .post('/api/login')
    .send({ email: dummyUser.email, password: dummyUser.password })
    .expect(200);

  return r;
};

const createReview = async (r) => {
  const review = await r
    .post(`/api/webapp/${webapp._id}/reviews`)
    .send({ rating: 3, review: 'it kinda works' })
    .expect(201);

  return review;
};
