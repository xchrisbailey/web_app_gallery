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
    icons: [
      {
        src: { type: String },
        purpose: { type: String },
      },
    ],
  },
  { timestamps: true },
);

webAppSchema.post('save', function (err, doc, next) {
  let errorMessage;

  const errMap = {
    manifestURL: 'This web application is already in our system',
  };

  if (err.code === 11000) {
    errorMessage = Object.keys(err.keyValue)
      .map((key) => errMap[key])
      .join(', ');
  } else {
    errorMessage = err.message;
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
