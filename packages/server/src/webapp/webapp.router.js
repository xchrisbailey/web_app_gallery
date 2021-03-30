const express = require('express');

const webAppController = require('./webapp.controller.js');

const r = new express.Router();

r.post('/webapp', webAppController.createWebApp);

module.exports = r;
