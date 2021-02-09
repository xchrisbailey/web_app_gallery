import path from 'path';

import('dotenv').then((dotenv) => {
  dotenv.config({
    path: path.join(__dirname, `.../.env.${process.env.NODE_ENV}`),
  });
});

import express from 'express';
import bodyParser from 'body-parser';
import expressPinoLogger from 'express-pino-logger';

import { logger } from './utils/logger';

const app = express();

// application settings
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressPinoLogger({ logger: logger }));

// load routers
app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

export default app;
