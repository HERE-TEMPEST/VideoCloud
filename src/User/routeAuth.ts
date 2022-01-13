/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { check } from 'express-validator';

import { AuthController } from './controllers/authConroller';

export const routerAuth: Router = Router();

routerAuth.post(
  '/registration',
  [
    check('email', 'email is uncorrectly').isLength({ max: 15, min: 4 }),
    check('password', 'password is uncorrectly').isLength({ max: 15, min: 4 }),
  ],
  AuthController.registration,
);
routerAuth.post(
  '/login',
  [
    check('email', 'email is uncorrectly').isLength({ max: 15, min: 4 }),
    check('password', 'password is uncorrectly').isLength({ max: 15, min: 4 }),
  ],
  AuthController.login,
);
routerAuth.post('/logout', AuthController.logout);
routerAuth.get('/refresh', AuthController.refresh);

routerAuth.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;

  res.status(status);
  res.json({
    message,
    status,
  });
});
