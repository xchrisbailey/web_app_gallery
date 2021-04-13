const axios = require('axios');
const cheerio = require('cheerio');

const getManifestInfo = async (url) => {
  if (!url) throw new Error('must provide a valid url');
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const appDescription = $('meta[name="description"]').attr('content'); // grab sites description from meta data
  const appleMobileWebAppCapable = $(
    'meta[name="apple-mobile-web-app-capable"]',
  ).attr('content');
  const manifestURL = url + $('link[rel="manifest"]').attr('href'); // construct manifests full url
  const manifest = await axios.get(manifestURL); // fetch manifest.json

  return {
    appleMobileWebAppCapable,
    appDescription,
    manifest,
    manifestURL,
  };
};

module.exports = getManifestInfo;
