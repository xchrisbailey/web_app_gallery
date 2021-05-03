const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  review: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  webapp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WebApp',
    required: true,
  },
});

reviewSchema.post('save', function (err, doc, next) {
  let errorMessage;

  if (err.code === 11000) {
    errorMessage = 'You have already reviewed this application';
  }

  if (errorMessage) next(new Error(errorMessage));
  else next();
});

reviewSchema.methods.toJSON = function () {
  const r = this;
  const review = r.toObject();
  delete review.__v;
  return review;
};

reviewSchema.index({ user: 1, webapp: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
