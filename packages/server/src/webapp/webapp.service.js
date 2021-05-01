const WebApp = require('./webapp.model');
const mongoose = require('mongoose');

// find a web app by id and return
const findWebApp = async (id) => {
  // const res = await WebApp.findById(id);
  const res = await WebApp.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: 'reviews',
        localField: 'reviews',
        foreignField: '_id',
        as: 'reviews',
      },
    },
    { $unwind: { path: '$reviews', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'users',
        localField: 'reviews.user',
        foreignField: '_id',
        as: 'reviews.user',
      },
    },
    { $unwind: { path: '$reviews.user', preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: '$_id',
        data: { $first: '$$ROOT' },
        reviews: { $push: '$reviews' },
      },
    },
    { $addFields: { 'data.reviews': '$reviews' } },
    {
      $replaceRoot: {
        newRoot: '$data',
      },
    },
    /* {
      $lookup: {
        from: 'reviews',
        foreignField: '_id',
        localField: 'reviews',
        as: 'reviews',
      },
    }, */
    {
      $addFields: {
        averageRating: { $avg: '$reviews.rating' },
      },
    },
    {
      $project: {
        'reviews.user.email': 0,
        'reviews.user.password': 0,
        'reviews.user.__v': 0,
        'reviews.user.createdAt': 0,
        'reviews.user.updatedAt': 0,
      },
    },
  ]);
  if (!res.length) throw new Error('web app not found');
  return res[0];
};

// make mongoose call to find all web apps and return paginated results
const findWebApps = async (opts = { limit: 10 }, filters = {}) => {
  let aggregates = [];
  if (filters.search) {
    aggregates.push({
      $match: {
        $or: [
          {
            name: {
              $regex: filters.search,
              $options: 'i',
            },
          },
          {
            description: {
              $regex: filters.search,
              $options: 'i',
            },
          },
        ],
      },
    });
  }

  if (filters.category) {
    aggregates.push({
      $match: {
        category: filters.category,
      },
    });
  }

  aggregates.push(
    {
      $lookup: {
        from: 'reviews',
        foreignField: '_id',
        localField: 'reviews',
        as: 'reviews',
      },
    },
    {
      $addFields: {
        averageRating: { $avg: '$reviews.rating' },
      },
    },
    {
      $project: {
        'reviews.user': 0,
      },
    },
  );

  const appAggregate = WebApp.aggregate(aggregates);

  const res = await WebApp.aggregatePaginate(appAggregate, {
    ...opts,
    page: opts.page > 0 ? opts.page : 1,
    customLabels: {
      docs: 'data',
    },
  });

  return res;
};

// create a new web app and return it
const createWebApp = async (user, data) => {
  const body = {
    ...data,
    submittedBy: user,
  };
  const app = WebApp.create(body);
  return app;
};

module.exports = {
  findWebApp,
  findWebApps,
  createWebApp,
};
