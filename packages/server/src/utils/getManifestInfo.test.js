const axios = require('axios');
const getManifestInfo = require('./getManifestInfo');
const { dummyGoogleManifest, dummyGoogleHtml } = require('../../tests/data');

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

afterEach(() => {
  jest.clearAllMocks();
});

test('should throw error if no url', async () => {
  try {
    await getManifestInfo('');
  } catch (e) {
    expect(e.message).toBe('must provide a valid url');
  }
});

test('should error if invalid url', async () => {
  try {
    await getManifestInfo('googlenews');
  } catch (e) {
    expect(e.message).toBe('Invalid URL: googlenews');
  }
});

test('should return manifest, manifestURL and a description', async () => {
  const { appDescription, manifest, manifestURL } = await getManifestInfo(
    'http://news.google.com/',
  );

  expect(appDescription).not.toBe('');
  expect(manifest).toEqual({
    data: expect.objectContaining({
      ...dummyGoogleManifest,
    }),
  });
  expect(manifestURL).toBe(
    'http://news.google.com/_/DotsSplashUi/manifest.json',
  );
});
