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
});

// reviewSchema.index({ user: 1, webApp: 1 }, { unique: true });

reviewSchema.post('save', function (err, doc, next) {
  let errorMessage;

  if (err.code === 11000) {
    errorMessage = 'You have already reviewed this application';
  }

  if (errorMessage) next(new Error(errorMessage));
  else next();
});

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;
