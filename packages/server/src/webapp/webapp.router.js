const express = require('express');

const auth = require('../middleware/auth');
const webAppController = require('./webapp.controller.js');

const r = new express.Router();

r.post('/webapp', auth, webAppController.createWebApp);
r.get('/webapp/:id', webAppController.getWebApp);
r.get('/webapp', webAppController.getWebApps);

module.exports = r;
