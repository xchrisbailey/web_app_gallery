require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const expressPinoLogger = require('express-pino-logger');

const logger = require('./utils/logger');
const db = require('./utils/db');

const app = express();

// connect to mongodb
db.connect()
  .then(() => {
    console.log('mongo connected');
  })
  .catch((e) => {
    console.log(e);
  });

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressPinoLogger({ logger: logger }));

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

module.exports = app;
