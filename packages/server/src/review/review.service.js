const mongoose = require('mongoose');

const Review = require('./review.model');
const WebApp = require('../webapp/webapp.model');

const addReview = async (user, appId, data) => {
  const review = await Review.create({ ...data, user });

  // add reference inside the designated web application
  const app = await WebApp.findByIdAndUpdate(
    appId,
    { $push: { reviews: review._id } },
    { new: true, useFindAndModify: false },
  ).populate('reviews');

  app.avgRating =
    app.reviews.reduce((a, b) => a + b['rating'], 0) / app.reviews.length;

  await app.save();

  return review;
};

const removeReviewById = async (user, reviewId) => {
  const result = await Review.deleteOne({
    _id: reviewId,
    user: user,
  });

  if (result.deletedCount === 0) return false;

  // also remove reference in designated app
  const app = await WebApp.findOneAndUpdate(
    { reviews: mongoose.Types.ObjectId(reviewId) },
    { $pull: { reviews: mongoose.Types.ObjectId(reviewId) } },
    { new: true },
  );

  app.avgRating =
    app.reviews.reduce((a, b) => a + b['rating'], 0) / app.reviews.length || 0;

  await app.save();
  return result !== null;
};

const updateReviewById = async (user, reviewId, updateData) => {
  const review = await Review.findOne({ _id: reviewId, user: user });
  if (!review) throw new Error('unable to update this review');
  Object.assign(review, updateData);

  await review.save();
  return review;
};

module.exports = {
  addReview,
  removeReviewById,
  updateReviewById,
};
