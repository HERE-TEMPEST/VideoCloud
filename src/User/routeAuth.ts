/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { check } from 'express-validator';

import { tokenVerify } from '../middleWare';

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
routerAuth.get('/all', tokenVerify, AuthController.getAllUsers);
