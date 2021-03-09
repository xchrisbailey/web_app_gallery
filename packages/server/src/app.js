require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const expressPinoLogger = require('express-pino-logger');

const logger = require('./utils/logger');
const db = require('./utils/db');

const { userRouter } = require('./user')

// create instance of app
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

// app configs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressPinoLogger({ logger: logger }));

// routers
app.use('/', userRouter)

module.exports = app;
