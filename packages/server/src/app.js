require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const expressPinoLogger = require('express-pino-logger');
const swaggerUi = require('swagger-ui-express')

const logger = require('./utils/logger');
const db = require('./utils/db');
const swaggerSpec = require('./utils/swagger.js')

const indexRouter = require('./routers/index');

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

// load api doc routes
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// routers
app.use('/', indexRouter); // attach index router to root path

module.exports = app;
