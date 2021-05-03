const express = require('express');

const auth = require('../middleware/auth');
const webAppController = require('./webapp.controller');
const webAppValidators = require('./webapp.validations');
const validate = require('../middleware/validate');

const r = new express.Router();

r.post(
  '/webapp',
  auth,
  validate(webAppValidators.createWebApp),
  webAppController.createWebApp,
);
r.get(
  '/webapp/:id',
  validate(webAppValidators.getWebApp),
  webAppController.getWebApp,
);
r.get(
  '/webapp',
  validate(webAppValidators.getWebApps),
  webAppController.getWebApps,
);

module.exports = r;
