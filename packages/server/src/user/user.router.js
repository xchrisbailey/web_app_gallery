const express = require('express');

const userController = require('./user.controller');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const userValidations = require('./user.validations');

const r = new express.Router();

r.get('/me', auth, userController.getProfile);
r.post(
  '/signup',
  validate(userValidations.createUser),
  userController.createUser,
);
r.post('/login', validate(userValidations.loginUser), userController.loginUser);
r.post('/logout', auth, userController.logoutUser);
r.delete('/me/destroy', auth, userController.deleteUser);
r.put(
  '/me',
  auth,
  validate(userValidations.updateUser),
  userController.updateUser,
);
r.put(
  '/me/updatePassword',
  auth,
  validate(userValidations.updatePassword),
  userController.updatePassword,
);

module.exports = r;
