const pino = require('pino');
const pinoColada = require('pino-colada');

const logger = pino({
  prettyPrint: {},
  prettifier: pinoColada,
});

module.exports = logger;
