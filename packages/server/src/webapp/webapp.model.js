const mongoose = require('mongoose');

const webAppSchema = new mongoose.Schema({}, { timestamps: true });

const WebApp = mongoose.model('WebApp', webAppSchema);

module.exports = WebApp;
