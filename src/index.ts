import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import { SecretValue } from './interfaces';
import { logger } from './loggger';
import { tokenVerify } from './middleWare';
import { routeShare } from './Share/routeShare';
import { routerAuth } from './User/routeAuth';
import { routeVideo } from './Video/routeVideo';

const app = express();

config();

export const secretValue: SecretValue = {
  DB_URL: process.env.DB_URL,
  PORT: parseInt(process.env.PORT),
  SECRET_KEY_ACCESS: process.env.SECRET_KEY_ACCESS,
  SECRET_KEY_REFRESH: process.env.SECRET_KEY_REFRESH,
};

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/user', routerAuth);
app.use('/video', tokenVerify, routeVideo);
app.use('/share', tokenVerify, routeShare);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;

  res.status(status);
  res.json({
    message,
    status,
  });
  logger.error(message);
});

async function createServer() {
  try {
    await mongoose.connect(process.env.DB_URL);

    app.listen(parseInt(process.env.PORT, 10), () => {
      console.log('start server with use port = ', parseInt(process.env.PORT, 10));
    });
  } catch (error) {
    logger.error(error);
  }
}
createServer();
