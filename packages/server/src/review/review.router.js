const express = require('express');

const auth = require('../middleware/auth');
const reviewController = require('./review.controller');
const reviewValidators = require('./review.validations');
const validate = require('../middleware/validate');

const r = new express.Router();

r.post(
  '/webapp/:appId/reviews',
  auth,
  validate(reviewValidators.createReview),
  reviewController.addReview,
);

r.put(
  '/review/:reviewId',
  auth,
  validate(reviewValidators.updateReview),
  reviewController.updateReview,
);

r.delete(
  '/review/:reviewId',
  auth,
  validate(reviewValidators.deleteReview),
  reviewController.deleteReview,
);

module.exports = r;
