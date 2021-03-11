const express = require('express');

const userController = require('./user.controller');
const auth = require('../middleware/auth');

const r = new express.Router();

r.get('/me', auth, userController.getProfile);
r.post('/signup', userController.createUser);
r.post('/login', userController.loginUser);
r.post('/logout', auth, userController.logoutUser);
r.delete('/me/destroy', auth, userController.deleteUser);
r.put('/me', auth, userController.updateUser);
r.put('/me/updatePassword', auth, userController.updatePassword);

module.exports = r;
