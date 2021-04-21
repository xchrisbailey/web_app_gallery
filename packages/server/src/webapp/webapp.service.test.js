// const mongoose = require('mongoose');

const db = require('../../tests/db');
const { dummyWebApp, dummyUser } = require('../../tests/data');
const webAppService = require('./webapp.service.js');
const { User } = require('../user/');
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
        const manifestURL = `${dummyWebApp.manifestURL}/${i}`;
        await WebApp.create({
          ...dummyWebApp,
          manifestURL,
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
        const manifestURL = `${dummyWebApp.manifestURL}/${i}`;
        await WebApp.create({
          ...dummyWebApp,
          manifestURL,
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

    // name searching
    await WebApp.create({
      ...dummyWebApp,
      manifestURL: 'test2',
      name: 'apple',
    });
    let res = await webAppService.findWebApps({}, { search: 'google' });
    expect(res.data.length).toBe(1);
    expect(res.data[0].name).toBe('google maps');

    // description search
    await WebApp.create({
      ...dummyWebApp,
      manifestURL: 'test',
      name: 'orange',
      description: 'fruit',
    });
    res = await webAppService.findWebApps({}, { search: 'fruit' });
    expect(res.data.length).toBe(1);
    expect(res.data[0].description).toBe('fruit');
  });

  it('should return app matching requested category', async () => {
    await WebApp.create(dummyWebApp);
    await WebApp.create({
      ...dummyWebApp,
      manifestURL: 'test',
      category: 'sports',
    });

    const res = await webAppService.findWebApps({}, { category: 'sports' });
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
