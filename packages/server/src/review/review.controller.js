const reviewService = require('./review.service');
const r = require('../utils/resHelpers');

const addReview = async (req, res) => {
  try {
    const body = {
      rating: req.body.rating,
      review: req.body.review,
    };

    const data = await reviewService.addReview(
      req.user,
      req.params.appId,
      body,
    );
    r.data(res, 201, data);
  } catch (e) {
    r.error(res, 400, e.message);
  }
};

const updateReview = async (req, res) => {
  try {
    const data = await reviewService.updateReviewById(
      req.user,
      req.params.reviewId,
      req.body,
    );
    r.data(res, 201, data);
  } catch (e) {
    r.error(res, 400, e.message);
  }
};
const deleteReview = async (req, res) => {
  try {
    if (await reviewService.removeReviewById(req.user, req.params.reviewId)) {
      r.success(res, 200, 'review successfully removed');
    } else {
      throw new Error('review could not be removed');
    }
  } catch (e) {
    r.error(res, 400, e.message);
  }
};

const getUserReviews = async (req, res) => {
  try {
    const data = await reviewService.getReviewsByUser(req.user._id);
    r.data(res, 200, data);
  } catch (e) {
    r.error(res, 400, e.message);
  }
};

module.exports = { addReview, updateReview, deleteReview, getUserReviews };
