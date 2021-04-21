const mongoose = require('mongoose');

const Review = require('./review.model');
const WebApp = require('../webapp/webapp.model');

const addReview = async (user, appId, data) => {
  const review = await Review.create({ ...data, user, webapp: appId });

  // add reference inside the designated web application
  await WebApp.findByIdAndUpdate(appId, { $push: { reviews: review._id } });

  return review;
};

const removeReviewById = async (user, reviewId) => {
  const result = await Review.deleteOne({
    _id: reviewId,
    user: user,
  });

  if (result.deletedCount === 0) return false;

  // also remove reference in designated app
  await WebApp.findOneAndUpdate(
    { reviews: reviewId },
    { $pull: { reviews: mongoose.Types.ObjectId(reviewId) } }, // remove review from the asscociated web application
  );

  return result !== null;
};

const updateReviewById = async (user, reviewId, updateData) => {
  const review = await Review.findOne({ _id: reviewId, user: user });
  if (!review) throw new Error('unable to update this review');
  Object.assign(review, updateData);

  await review.save();
  return review;
};

const getReviewsByUser = async (uid) => {
  const reviews = await Review.find({
    user: { $in: [mongoose.Types.ObjectId(uid)] },
  }).populate('webapp', ['_id', 'name']);

  if (!reviews || reviews.length === 0) throw new Error('No Reviews Found');
  return reviews;
};

module.exports = {
  addReview,
  removeReviewById,
  updateReviewById,
  getReviewsByUser,
};
