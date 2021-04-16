const Joi = require('joi');

const createReview = {
  params: Joi.object().keys({
    appId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    rating: Joi.number().min(0).max(5).required(),
    review: Joi.string(),
  }),
};

const updateReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    rating: Joi.number().min(0).max(5),
    review: Joi.string(),
  }),
};

const deleteReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().required(),
  }),
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
};
