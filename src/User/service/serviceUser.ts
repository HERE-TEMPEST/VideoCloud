import { compare, hash } from 'bcrypt';

import { MyError } from '../../Error';
import { tokenDB } from '../DB/tokenDB';
import { userDB } from '../DB/userDB';

class UserService {
  async login(email: string, password: string) {
    const isUser = await userDB.getUser(email);

    if (!isUser) {
      throw new MyError('login or password uncorrectly', 401);
    }
    const isPassewCompare = await compare(password, isUser.password);

    if (!isPassewCompare) {
      throw new MyError('login or password uncorrectly', 401);
    }
    const tokens = tokenDB.generateToken({ userId: isUser.id });

    await tokenDB.saveToken(isUser.id, tokens.refreshToken);

    return tokens;
  }

  async logout(refreshToken: string) {
    const payload = await tokenDB.removeToken(refreshToken);

    if (!payload) {
      throw new MyError('refreshToken is not verify', 401);
    }

    return payload;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new MyError('this refreshToken is undefined...', 401);
    }
    const payload = tokenDB.validateRefreshToken(refreshToken);

    const existInDB = await tokenDB.existRefreshToken(refreshToken);

    if (!existInDB || !payload) {
      throw new MyError('refreshToken is not verify', 401);
    }

    const tokens = tokenDB.generateToken({ userId: payload.userId });

    await tokenDB.saveToken(payload.userId, tokens.refreshToken);

    return tokens;
  }

  async registration(email: string, password: string) {
    const isUser = await userDB.getUser(email);

    if (isUser) {
      throw new MyError('this user exist in system...', 401);
    }
    const hashPassword = await hash(password, 3);

    const newUser = await userDB.addUser(email, hashPassword);

    const tokens = tokenDB.generateToken({ userId: newUser.id });

    await tokenDB.saveToken(newUser.id, tokens.refreshToken);

    return tokens;
  }
}

export const serviceUser = new UserService();
