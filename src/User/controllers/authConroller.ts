import { Response, Request } from 'express';
import { validationResult } from 'express-validator';

import { serviceUser } from '../service/serviceUser';

class UserController {
  async login(req: Request, res: Response, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw errors;
      }
      const { email, password } = req.body;

      const user = await serviceUser.login(email, password);

      res.cookie('refreshToken', user.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json(user.accessToken);
    } catch (error) {
      return next(error);
    }
  }

  async logout(req: Request, res: Response, next) {
    try {
      const { refreshToken } = req.cookies;

      const payload = await serviceUser.logout(refreshToken);

      res.clearCookie('refreshToken');

      return res.status(200).json(payload);
    } catch (error) {
      return next(error);
    }
  }

  async refresh(req: Request, res: Response, next) {
    try {
      const { refreshToken } = req.cookies;

      res.clearCookie('refreshToken');

      const user = await serviceUser.refresh(refreshToken);

      res.cookie('refreshToken', user.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json(user.accessToken);
    } catch (error) {
      return next(error);
    }
  }

  async registration(req: Request, res: Response, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw errors;
      }
      const { email, password } = req.body;

      const user = await serviceUser.registration(email, password);

      res.cookie('refreshToken', user.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }
}

export const AuthController = new UserController();
