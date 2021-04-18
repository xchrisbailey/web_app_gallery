const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const categories = [
  'books',
  'business',
  'donations',
  'education',
  'entertainment',
  'finance',
  'fitness',
  'food',
  'fundraising',
  'games',
  'government',
  'health',
  'kids',
  'lifestyle',
  'magazines',
  'medical',
  'music',
  'navigation',
  'news',
  'personalization',
  'photo',
  'politics',
  'productivity',
  'security',
  'shopping',
  'social',
  'sports',
  'travel',
  'utilities',
  'weather',
];

const webAppSchema = new mongoose.Schema(
  {
    manifestURL: { type: String, required: true, unique: true },
    startURL: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    appleMobileWebAppCapable: { type: 'boolean', default: false },
    themeColor: { type: String },
    backgroundColor: { type: String },
    category: { type: String, required: true, enum: categories },
    submittedBy: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    avgRating: { type: Number, min: 0, max: 5, default: 0 },
    icons: [
      {
        src: { type: String, required: true },
        purpose: { type: String },
        sizes: { type: String },
        type: { type: String },
      },
    ],
    screenshots: [
      {
        src: { type: String, required: true },
        sizes: { type: String },
        type: { type: String },
      },
    ],
  },
  { timestamps: true },
);

webAppSchema.pre('save', async function (err, doc, next) {
  const webApp = this;
  mongoose.models['WebApp'].aggregate(
    [
      { $match: { _id: webApp._id } },
      {
        $lookup: {
          from: 'Review',
          localField: 'reviews',
          foreignField: '_id',
          as: 'reviews',
        },
      },
      {
        $unwind: '$reviews',
      },
      {
        $group: {
          _id: null,
          avgRating: {
            $avg: '$reviews.rating',
          },
        },
      },
    ],
    function (err, data) {
      if (err) throw new Error(err.message);
      data.map(function (doc) {
        if (!doc.avgRating) {
          webApp.avgRating = 0;
        } else {
          webApp.avgRating = doc.avgRating;
        }
      });
      next();
    },
  );

  /* await webApp.populate('reviews');

  this.avgRating =
    webApp.reviews.reduce((a, b) => a + (b['rating'] || 0), 0) /
    webApp.reviews.length;
  next(); */
});

webAppSchema.post('save', function (err, doc, next) {
  let errorMessage;

  if (err.code === 11000) {
    errorMessage = 'This web application is already in our system';
  }

  if (errorMessage) next(new Error(errorMessage));
  else next();
});

webAppSchema.plugin(mongoosePaginate);

// sanitize sensitive info before returning json
webAppSchema.methods.toJSON = function () {
  const webApp = this;
  const wap = webApp.toObject();

  delete wap.__v;

  return wap;
};
const WebApp = mongoose.model('WebApp', webAppSchema);

module.exports = WebApp;
