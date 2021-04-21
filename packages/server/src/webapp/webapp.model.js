const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

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
  {
    timestamps: true,
  },
);

webAppSchema.post('save', function (err, doc, next) {
  let errorMessage;

  if (err.code === 11000) {
    errorMessage = 'This web application is already in our system';
  }

  if (errorMessage) next(new Error(errorMessage));
  else next();
});

webAppSchema.plugin(aggregatePaginate);

// sanitize sensitive info before returning json
webAppSchema.methods.toJSON = function () {
  const w = this;
  const webApp = w.toObject();

  delete webApp.__v;

  return webApp;
};

const WebApp = mongoose.model('WebApp', webAppSchema);

module.exports = WebApp;
