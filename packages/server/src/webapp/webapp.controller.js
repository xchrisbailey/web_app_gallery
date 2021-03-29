const axios = require('axios');
const r = require('../utils/resHelpers');
const webAppService = require('./webapp.service');

const getWebApp = async (req, res) => {
  try {
    const data = await webAppService.findWebApp(req.params.id);
    r.data(res, 200, data);
  } catch (e) {
    r.error(res, 400, e.message);
  }
};

const getWebApps = async (req, res) => {
  const opts = {
    page: req.query.page && req.query.page,
    limit: req.query.limit ? req.query.limit : 10,
  };

  try {
    const data = await webAppService.findWebApps(opts);
    if (data.page > data.totalPages) throw new Error('no applications found');
    r.data(res, 200, data);
  } catch (e) {
    r.error(res, 400, e.message);
  }
};

const createWebApp = async (req, res) => {
  try {
    const manifest = await axios.get(req.body.manifestURL);
    const data = {
      ...req.body,
      startURL: manifest.data.start_url,
      name: manifest.data.name,
      themeColor: manifest.data.theme_color,
      backgroundColor: manifest.data.backgroundColor,
      icons: manifest.data.icons,
    };

    const response = await webAppService.createWebApp(data);
    r.data(res, 201, response);
  } catch (e) {
    r.error(res, 400, e.message);
  }
};

module.exports = {
  getWebApp,
  getWebApps,
  createWebApp,
};
