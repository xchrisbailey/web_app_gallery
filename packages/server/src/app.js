require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const expressPinoLogger = require('express-pino-logger');
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const logger = require('./utils/logger');
const swaggerSpec = require('./utils/swagger.js');

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

// load api doc routes
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routers
app.use('/api/', userRouter);

module.exports = app;
