const express = require('express');

const userController = require('./user.controller');
const auth = require('../middleware/auth');

const r = new express.Router();

r.post('/signup', userController.createUser);
r.post('/login', userController.loginUser);
r.post('/logout', userController.logoutUser)
r.get('/me', auth, userController.getProfile);

module.exports = r;
