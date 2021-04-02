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
    let data;
    if (req.query.search) {
      data = await webAppService.searchWebApps(opts, req.query.search);
    } else {
      data = await webAppService.findWebApps(opts);
      if (data.page > data.totalPages) throw new Error('no applications found');
    }
      r.pageData(res, 200, data);
  } catch (e) {
    r.error(res, 400, e.message);
  }
};

const createWebApp = async (req, res) => {
  try {
    if (!req.body.appUrl || req.body.appUrl === '')
      throw new Error('url cannot be empty');
    const url = req.body.appUrl.match(/\/$/)
      ? req.body.appUrl
      : `${req.body.appUrl}/`;

    const { appDescription, manifest, manifestURL } = await getManifestInfo(
      url,
    );

    const appData = {
      manifestURL: manifestURL,
      startURL: manifest.data.start_url,
      name: manifest.data.name,
      themeColor: manifest.data.theme_color,
      backgroundColor: manifest.data.backgroundColor,
      icons: manifest.data.icons,
      description: manifest.data.description
        ? manifest.data.description
        : appDescription,
      appleMobileWebAppCapable: req.body.appleMobileWebAppCapable
        ? req.body.appleMobileWebAppCapable
        : false,
    };

    const response = await webAppService.createWebApp(appData);
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
