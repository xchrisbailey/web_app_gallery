const Joi = require('joi');

const getWebApp = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const getWebApps = {
  query: Joi.object().keys({
    page: Joi.number(),
    limit: Joi.number(),
    search: Joi.string(),
    category: Joi.string(),
  }),
};

const createWebApp = {
  body: Joi.object().keys({
    category: Joi.string().required(),
    appUrl: Joi.string().required(),
  }),
};

module.exports = {
  getWebApp,
  getWebApps,
  createWebApp,
};
