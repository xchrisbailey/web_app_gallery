const express = require('express');

const webAppController = require('./webapp.controller.js');

const r = new express.Router();

r.post('/webapp', webAppController.createWebApp);
r.get('/webapp/:id', webAppController.getWebApp);
r.get('/webapp', webAppController.getWebApps);

module.exports = r;
