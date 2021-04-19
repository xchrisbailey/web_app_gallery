const mongoose = require('mongoose');
const db = require('../../tests/db');
const Review = require('./review.model');
const reviewController = require('./review.controller');
const reviewService = require('./review.service');
const { dummyWebApp, dummyUser } = require('../../tests/data');
const { mockRequest, mockResponse } = require('../../tests/utils/interceptors');
const { User } = require('../user');
const { WebApp } = require('../webapp');

let user;
let webapp;

beforeAll(async () => await db.connect());
beforeEach(async () => {
  await db.clear();
  user = await User.create(dummyUser);
  webapp = await WebApp.create({ ...dummyWebApp, submittedBy: user });
});
afterAll(async () => {
  await db.clear();
  await db.close();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('create review', () => {
  it('should 200 and create review', async () => {
    const { req, res } = mockPrepare(
      {
        rating: 4,
        review: 'Lorem alias sit et facere',
      },
      user,
    );
    req.params.appId = webapp._id;

    const reviewServiceSpy = jest.spyOn(reviewService, 'addReview');

    const bodyCheck = {
      rating: 4,
      review: 'Lorem alias sit et facere',
    };

    await reviewController.addReview(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(reviewServiceSpy).toHaveBeenCalledWith(user, webapp._id, bodyCheck);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ rating: 4 }),
      }),
    );
  });

  it('should 400 when missing required informaton', async () => {
    const { req, res } = mockPrepare(
      {
        review: 'Lorem alias sit et facere',
      },
      user,
    );
    req.params.appId = webapp._id;

    const reviewServiceSpy = jest.spyOn(reviewService, 'addReview');

    const bodyCheck = {
      review: 'Lorem alias sit et facere',
    };

    await reviewController.addReview(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(reviewServiceSpy).toHaveBeenCalledWith(user, webapp._id, bodyCheck);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'error',
      }),
    );
  });
});

describe('update review', () => {
  it('should 200 and return updated review', async () => {
    const review = await seedReview();
    const { req, res } = mockPrepare({ rating: 2 }, user);
    req.params.reviewId = review._id;
    const reviewServiceSpy = jest.spyOn(reviewService, 'updateReviewById');
    await reviewController.updateReview(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(reviewServiceSpy).toHaveBeenCalledWith(user, review._id, req.body);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          _id: review._id,
          rating: 2,
        }),
      }),
    );
  });

  it('should 400 and return error when no review found', async () => {
    const { req, res } = mockPrepare({ rating: 3 }, user);
    req.params.reviewId = mongoose.Types.ObjectId;

    await reviewController.updateReview(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'error' }),
    );
  });

  it('should 400 and return error with invalid/missing information', async () => {
    const review = await seedReview();
    const { req, res } = mockPrepare({ rating: 'one' }, user);
    req.params = { reviewId: review._id };

    await reviewController.updateReview(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'error' }),
    );
  });

  it('should 401 and return error when not owner', async () => {
    const review = await seedReview();
    const newUser = await User.create({
      ...dummyUser,
      email: 'example@example.com',
    });
    const { req, res } = mockPrepare({ rating: 1 }, newUser);
    req.params = { reviewId: review._id };

    await reviewController.updateReview(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'error' }),
    );
  });
});

describe('delete review', () => {
  it('should 200 and return success', async () => {
    const review = await seedReview();
    const { req, res } = mockPrepare(null, user);
    req.params.reviewId = review._id;
    const reviewServiceSpy = jest.spyOn(reviewService, 'removeReviewById');

    await reviewController.deleteReview(req, res);

    expect(reviewServiceSpy).toHaveBeenCalledWith(user, review._id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ok' }),
    );
  });

  it('should error when not review owner', async () => {
    const review = await seedReview();
    const { req, res } = mockPrepare(
      null,
      await User.create({ ...dummyUser, email: 'example@example.com' }),
    );
    req.params.reviewId = review._id;

    await reviewController.deleteReview(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'error' }),
    );
  });

  it('should 400 and return error if review doesnt exist', async () => {
    const { req, res } = mockPrepare({}, user);
    req.params.reviewId = mongoose.Types.ObjectId();

    await reviewController.deleteReview(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'error' }),
    );
  });
});

describe('get user reviews', () => {
  it('should return reviews created by requested user', async () => {
    await seedReview();

    const user2 = await User.create({
      ...dummyUser,
      email: 'dummy@example.com',
    });
    const userTwoReview = await Review.create({
      rating: 4,
      review: 'Lorem alias sit et facere',
      user: user2,
    });

    await WebApp.findByIdAndUpdate(webapp._id, {
      $push: { reviews: userTwoReview._id },
    });

    const { req, res } = mockPrepare({}, user);

    await reviewController.getUserReviews(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ data: [expect.anything()] }),
    );
  });
});

const seedReview = async () => {
  const review = await Review.create({
    rating: 4,
    review: 'Lorem alias sit et facere',
    user: user,
  });

  await WebApp.findByIdAndUpdate(webapp._id, {
    $push: { reviews: review._id },
  });

  return review;
};

const mockPrepare = (body, user) => {
  const req = mockRequest();
  if (body) req.body = body;
  req.user = user;
  const res = mockResponse();

  return {
    req,
    res,
  };
};
