require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const expressPinoLogger = require('express-pino-logger');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const logger = require('./utils/logger');

const { userRouter } = require('./user');

// create instance of app
const app = express();

app.set('port', process.env.PORT || 3000);

// app configs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(expressPinoLogger({ logger: logger }));

// routers
app.use('/api/', userRouter);

module.exports = app;
