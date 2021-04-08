const Joi = require('joi');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().min(6).required(),
  }),
};

const updateUser = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    firstName: Joi.string(),
    lastName: Joi.string(),
  }),
};

const updatePassword = {
  body: Joi.object().keys({
    newPassword: Joi.string().required(),
  }),
};

const loginUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  createUser,
  updateUser,
  updatePassword,
  loginUser,
};
