import { createLogger, transports, format } from 'winston';

export const logger = createLogger({
  format: format.printf((info) => {
    return `Error: ${info.message}`;
  }),
  transports: [new transports.File({ filename: 'app.log' })],
});
