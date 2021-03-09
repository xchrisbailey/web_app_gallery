const express = require('express');

const userController = require('./user.controller');
const auth = require('../middleware/auth');

const r = new express.Router();

r.post('/signup', userController.createUser);
r.post('/login', userController.loginUser);
r.get('/me', auth, async (req, res) => {
  res.json(req.user);
});

module.exports = r;
