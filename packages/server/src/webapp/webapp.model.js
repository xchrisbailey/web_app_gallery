const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const webAppSchema = new mongoose.Schema(
  {
    manifestURL: { type: String, required: true },
    startURL: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    appleMobileWebCapable: { type: 'boolean', default: false },
    themeColor: { type: String },
    backgroundColor: { type: String },
    icon: {
      src: { type: String },
      purpose: { type: String },
    },
    screenshot: {
      src: { type: String },
      size: {
        height: { type: Number },
        width: { type: Number },
      },
      label: { type: String },
      platform: { type: String },
    },
  },
  { timestamps: true },
);

webAppSchema.plugin(mongoosePaginate);

const WebApp = mongoose.model('WebApp', webAppSchema);

module.exports = WebApp;
