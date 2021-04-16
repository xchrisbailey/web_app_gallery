const db = require('../../tests/db');
const mongoose = require('mongoose');
const reviewService = require('./review.service.js');
const Review = require('./review.model');
const { dummyWebApp, dummyUser } = require('../../tests/data');
const { User } = require('../user/');
const { WebApp } = require('../webapp');

beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('create review', () => {
  it('should create and return a review', async () => {
    const user = await User.create(dummyUser);
    const webapp = await WebApp.create({ ...dummyWebApp, submittedBy: user });
    const data = {
      rating: 4,
      review: 'Sit eveniet cum omnis',
    };
    const review = await reviewService.addReview(user, webapp, data);

    expect(review).not.toBe(null);
    expect(review.rating).toBe(4);
  });
});

describe('delete review', () => {
  it('should remove the requested review', async () => {
    const user = await User.create(dummyUser);
    const webapp = await WebApp.create({ ...dummyWebApp, submittedBy: user });
    const data = {
      rating: 4,
      review: 'Sit eveniet cum omnis',
    };
    const review = await Review.create({ user, webapp, ...data });

    const res = await reviewService.removeReviewById(user, review._id);
    expect(res).toBe(true);

    const check = await Review.findById(review._id);
    expect(check).toBe(null);
  });

  it('should return false if review didnt exist', async () => {
    const user = await User.create(dummyUser);
    const res = await reviewService.removeReviewById(
      user,
      mongoose.Types.ObjectId(),
    );
    expect(res).toBe(false);
  });
});

describe('update review', () => {
  it('should update a review', async () => {
    const user = await User.create(dummyUser);
    const webapp = await WebApp.create({ ...dummyWebApp, submittedBy: user });
    const data = {
      rating: 4,
      review: 'Sit eveniet cum omnis',
    };
    const review = await Review.create({ user, webapp, ...data });

    const updates = {
      rating: 2,
    };

    const updatedReview = await reviewService.updateReviewById(
      user,
      review._id,
      updates,
    );
    expect(updatedReview.rating).toBe(2);
    expect(updatedReview.review).toBe(review.review);
  });

  it('should error if review does not exist', async () => {
    const user = await User.create(dummyUser);
    const updates = {
      rating: 2,
    };

    try {
      await reviewService.updateReviewById(
        user,
        mongoose.Types.ObjectId(),
        updates,
      );
    } catch (e) {
      expect(e.message).toBe('unable to update this review');
    }
  });
});
