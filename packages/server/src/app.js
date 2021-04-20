require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const expressPinoLogger = require('express-pino-logger');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const logger = require('./utils/logger');

const { UserRouter } = require('./user');
const { WebAppRouter } = require('./webapp');
const { ReviewRouter } = require('./review');

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
app.use('/api/', UserRouter);
app.use('/api/', WebAppRouter);
app.use('/api/', ReviewRouter);

module.exports = app;
