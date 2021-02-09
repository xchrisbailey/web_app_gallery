import pino from 'pino';
import pinoColada from 'pino-colada';

export const logger = pino({
  prettyPrint: {},
  prettifier: pinoColada,
});

