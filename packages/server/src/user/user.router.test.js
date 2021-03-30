const supertest = require('supertest');

const db = require('../../test/db');
const { dummyUser } = require('../../test/data');
const app = require('../app.js');

const request = supertest(app);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('GET /me', () => {
  it('should return logged in user info', async () => {
    const r = supertest.agent(app);
    await r.post('/api/signup').send(dummyUser);
    const res = await r.get('/api/me').send().expect(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.data.email).toBe(dummyUser.email);
  });

  it('should return error if not logged in', async () => {
    const res = await request.get('/api/me').send().expect(401);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('Must be logged in to perform this action');
  });
});

describe('POST /signup', () => {
  it('should create a new user', async () => {
    const res = await request.post('/api/signup').send(dummyUser).expect(201);
    expect(res.body.status).toBe('ok');
    expect(res.body.data.email).toBe(dummyUser.email);
  });

  it('should return error with missing information', async () => {
    const res = await request
      .post('/api/signup')
      .send({ ...dummyUser, firstName: '' })
      .expect(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe(
      'User validation failed: firstName: first name is required',
    );
  });

  it('should return error with invalid email address', async () => {
    const res = await request
      .post('/api/signup')
      .send({ ...dummyUser, email: 'sameexamplecom' })
      .expect(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe(
      'User validation failed: email: invalid email address',
    );
  });
});

describe('POST /login', () => {
  it('should log in user with valid credentials', async () => {
    const r = supertest.agent(app);
    await r.post('/api/signup').send(dummyUser);
    await r.post('/api/logout').expect(200);

    let res = await r
      .post('/api/login')
      .send({ email: dummyUser.email, password: dummyUser.password })
      .expect(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.data.email).toBe(dummyUser.email);

    res = await r.get('/api/me').send().expect(200);
    expect(res.body.data.email).toBe(dummyUser.email);
  });

  it('should error with invalid credentials', async () => {
    const r = supertest.agent(app);
    await r.post('/api/signup').send(dummyUser);
    await r.post('/api/logout').expect(200);

    let res = await r
      .post('/api/login')
      .send({ email: dummyUser.email, password: 'zxc123' })
      .expect(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('Invalid login credentials');
  });
});

describe('POST /logout', () => {
  it('should clear users auth cookie', async () => {
    const r = supertest.agent(app);
    await r.post('/api/signup').send(dummyUser);
    await r.get('/api/me').send().expect(200);
    await r.post('/api/logout').send().expect(200);
    const res = await r.get('/api/me').send().expect(401);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('Must be logged in to perform this action');
  });
});

describe('DELETE /me/destroy', () => {
  it('should remove logged in user accout', async () => {
    const r = supertest.agent(app);
    await r.post('/api/signup').send(dummyUser);
    await r.get('/api/me').send().expect(200);

    let res = await r.delete('/api/me/destroy').send().expect(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.data.message).toBe('Account successfully removed');

    await r.get('/api/me').send().expect(401);
  });

  it('should error if not logged in', async () => {
    const res = await request.delete('/api/me/destroy').send().expect(401);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('Must be logged in to perform this action');
  });
});

describe('PUT /me', () => {
  it('should update user information', async () => {
    const r = supertest.agent(app);
    await r.post('/api/signup').send(dummyUser);
    let res = await r
      .put('/api/me')
      .send({
        firstName: 'christopher',
        email: 'christopher@example.net',
      })
      .expect(201);

    expect(res.body.status).toBe('ok');
    expect(res.body.data.firstName).toBe('christopher');
    expect(res.body.data.email).toBe('christopher@example.net');
    expect(res.body.data.lastName).toBe(dummyUser.lastName);

    // get user from database and recheck that data was updated properly
    res = await r.get('/api/me').send().expect(200);
    expect(res.body.data.firstName).toBe('christopher');
    expect(res.body.data.email).toBe('christopher@example.net');
  });

  it('should error with invalid updates', async () => {
    const r = supertest.agent(app);
    await r.post('/api/signup').send(dummyUser);
    let res = await r
      .put('/api/me')
      .send({
        password: 'zxc123',
      })
      .expect(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('No valid updates provided');
  });
});

describe('PUT /me/updatePassword', () => {
  it('should update users password', async () => {
    const r = supertest.agent(app);
    await r.post('/api/signup').send(dummyUser);
    let res = await r
      .put('/api/me/updatePassword')
      .send({
        newPassword: 'zxc123',
      })
      .expect(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.data.message).toBe('Password successfully updated');
  });

  it('should error when new password is invalid', async () => {
    const r = supertest.agent(app);
    await r.post('/api/signup').send(dummyUser);
    let res = await r
      .put('/api/me/updatePassword')
      .send({
        newPassword: 'zx',
      })
      .expect(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe(
      'User validation failed: password: password must be at least 6 characters long',
    );
  });
});
