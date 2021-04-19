const axios = require('axios');
const cheerio = require('cheerio');

const getManifestInfo = async (url) => {
  if (!url) throw new Error('must provide a valid url');
  const { data } = await axios.get(addhttp(url));
  const $ = cheerio.load(data);
  const appDescription = $('meta[name="description"]').attr('content'); // grab sites description from meta data

  const manifestURL = new URL($('link[rel="manifest"]').attr('href'), url).href; // construct manifests full url

  const manifest = await axios.get(manifestURL); // fetch manifest.json

  return {
    appDescription,
    manifest,
    manifestURL,
  };
};

const addhttp = (url) => {
  if (!/^(?:f|ht)tps?:\/\//.test(url)) {
    url = 'https://' + url;
  }
  return url;
};

module.exports = getManifestInfo;
