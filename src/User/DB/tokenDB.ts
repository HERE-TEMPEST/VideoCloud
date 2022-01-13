import { sign, verify } from 'jsonwebtoken';
import { Types } from 'mongoose';

import { SECRET_KEY_ACCESS, SECRET_KEY_REFRESH } from '../../config';
import { JwtPayLoad } from '../../interfaces';
import { TokenModel } from '../models/token-model';

import { OutToken, Tokens } from './interfaces';

class TokenDB {
  async existRefreshToken(refreshToken): Promise<OutToken> {
    try {
      const isToken = await TokenModel.findOne({ refreshToken });

      if (!isToken) {
        return null;
      }

      return {
        refreshToken: isToken.refreshToken,
        userId: isToken.userId,
      };
    } catch (error) {
      return null;
    }
  }

  generateToken(payload: JwtPayLoad): Tokens {
    try {
      const accessToken = sign(payload, SECRET_KEY_ACCESS, { expiresIn: '180m' });
      const refreshToken = sign(payload, SECRET_KEY_REFRESH, { expiresIn: '30d' });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      return null;
    }
  }

  async removeToken(refreshToken): Promise<OutToken> {
    try {
      const payload = await TokenModel.findOneAndDelete({ refreshToken });

      if (!payload) {
        return null;
      }

      return {
        refreshToken: payload.refreshToken,
        userId: payload.userId,
      };
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId: Types.ObjectId, refreshToken: string): Promise<OutToken> {
    try {
      const isToken = await TokenModel.findOne({ userId });

      if (isToken) {
        isToken.refreshToken = refreshToken;

        return isToken.save();
      }
      const newToken = new TokenModel({ refreshToken, userId });

      await newToken.save();

      return {
        refreshToken: newToken.refreshToken,
        userId: newToken.userId,
      };
    } catch (error) {
      return null;
    }
  }

  validateAccessToken(accessToken): JwtPayLoad {
    try {
      const payload = verify(accessToken, SECRET_KEY_ACCESS) as JwtPayLoad;

      return payload;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(refreshToken): JwtPayLoad {
    try {
      const payload = verify(refreshToken, SECRET_KEY_REFRESH) as JwtPayLoad;

      return payload;
    } catch (error) {
      return null;
    }
  }
}

export const tokenDB = new TokenDB();
