const getManifestInfo = require('../utils/getManifestInfo');
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
    let filters = {};
    if (req.query.search !== '') filters.search = req.query.search;
    if (req.query.category !== '') filters.category = req.query.category;

    const data = await webAppService.findWebApps(opts, filters);
    if (data.page > data.totalPages) throw new Error('no applications found');

    r.pageData(res, 200, data);
  } catch (e) {
    r.error(res, 400, e.message);
  }
};

const createWebApp = async (req, res) => {
  try {
    const url = req.body.appUrl.match(/\/$/)
      ? req.body.appUrl
      : `${req.body.appUrl}/`;

    const {
      appleMobileWebAppCapable,
      appDescription,
      manifest,
      manifestURL,
    } = await getManifestInfo(url);

    const appData = {
      manifestURL: manifestURL,
      startURL: manifest.data.start_url,
      name: manifest.data.name,
      themeColor: manifest.data.theme_color,
      backgroundColor: manifest.data.backgroundColor,
      icons: manifest.data.icons,
      screenshots: manifest.data.icons ? manifest.data.screenshots : null,
      description: manifest.data.description
        ? manifest.data.description
        : appDescription,
      appleMobileWebAppCapable: appleMobileWebAppCapable,
      category: req.body.category,
    };

    const response = await webAppService.createWebApp(req.user, appData);
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
