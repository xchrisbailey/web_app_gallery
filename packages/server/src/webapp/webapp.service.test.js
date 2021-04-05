const mongoose = require('mongoose');

const db = require('../../test/db');
const { dummyWebApp, dummyUser } = require('../../test/data');
const webAppService = require('./webapp.service.js');
const User = require('../user/user.model');
const WebApp = require('./webapp.model');

beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('get single web app', () => {
  it('should return single web app object when exists', async () => {
    const user = await User.create(dummyUser);
    const sampleApp = await WebApp.create({
      ...dummyWebApp,
      submittedBy: user,
    });
    const res = await webAppService.findWebApp(sampleApp._id);
    expect(res._id).toEqual(sampleApp._id);
    expect(res.startURL).toBe(sampleApp.startURL);
    expect(res.submittedBy._id).toEqual(user._id);
  });

  it('should return error if app does not exists', async () => {
    try {
      await webAppService.findWebApp(mongoose.Types.ObjectId());
    } catch (error) {
      expect(error.message).toBe('web app not found');
    }
  });

  it('should error if not id given', async () => {
    try {
      await webAppService.findWebApp();
    } catch (error) {
      expect(error.message).toBe('must provide a application id');
    }
  });

  describe('get web apps', () => {
    it('should return array of web apps', async () => {
      const user = await User.create(dummyUser);
      const sampleApp = await WebApp.create({
        ...dummyWebApp,
        submittedBy: user,
      });
      const res = await webAppService.findWebApps();
      expect(res.data.length).toBe(1);
      expect(res.data[0]._id).toEqual(sampleApp._id);
    });

    it('should allow limit to be set', async () => {
      const user = await User.create(dummyUser);
      for (let i = 0; i < 10; i++) {
        await WebApp.create({
          ...dummyWebApp,
          submittedBy: user,
        });
      }

      const opts = {
        limit: 2,
      };

      const res = await webAppService.findWebApps(opts);
      expect(res.page).toBe(1);
      expect(res.limit).toBe(2);
      expect(res.data.length).toBe(2);
    });

    it('should return second page when asked and exists', async () => {
      const user = await User.create(dummyUser);
      for (let i = 0; i < 10; i++) {
        await WebApp.create({
          ...dummyWebApp,
          submittedBy: user,
        });
      }

      const opts = {
        limit: 2,
        page: 2,
      };

      const res = await webAppService.findWebApps(opts);
      expect(res.page).toBe(2);
      expect(res.limit).toBe(2);
    });

    it('should return an empty array if no apps', async () => {
      await db.clear();
      const res = await webAppService.findWebApps();
      expect(res.data.length).toBe(0);
    });
  });

  it('should return search results', async () => {
    await WebApp.create(dummyWebApp);
    await WebApp.create({ ...dummyWebApp, name: 'apple' });
    const res = await webAppService.findWebApps({}, { search: 'google' });
    expect(res.data.length).toBe(1);
  });

  it('should return app matching requested category', async () => {
    await WebApp.create(dummyWebApp);
    await WebApp.create({ ...dummyWebApp, category: 'sports' });

    const res = await webAppService.findWebApps({}, { category: 'news' });
    expect(res.data.length).toBe(1);
  });
});

describe('create web app', () => {
  it('should create new web app', async () => {
    const user = await User.create(dummyUser);
    const res = await webAppService.createWebApp(user, dummyWebApp);

    expect(res.manifestURL).toBe(dummyWebApp.manifestURL);
  });

  it('should error when missing information', async () => {
    try {
      const user = await User.create(dummyUser);
      await webAppService.createWebApp(user, { ...dummyWebApp, startURL: '' });
    } catch (error) {
      expect(error.message).toBe(
        'WebApp validation failed: startURL: Path `startURL` is required.',
      );
    }
  });
});