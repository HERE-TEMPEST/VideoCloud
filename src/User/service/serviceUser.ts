import { compare, hash } from 'bcrypt';

import { MyError } from '../../Error';
import { UserModel } from '../models/user-model';
import { ServiceToken } from '../service/serviceToken';

class UserService {
  async getAllUsers() {
    const users = await UserModel.find();

    const usersId = users.map((value: any) => {
      return value._id;
    });

    return usersId;
  }

  async getUser(email: string) {
    const user = await UserModel.findOne({ email });

    return user;
  }

  async login(email, password) {
    const isUser = await UserModel.findOne({ email });

    if (!isUser) {
      throw new MyError('login or password uncorrectly', 401);
    }
    const isPassewCompare = await compare(password, isUser.password);

    if (!isPassewCompare) {
      throw new MyError('login or password uncorrectly', 401);
    }
    const tokens = ServiceToken.generateToken({ userId: isUser._id });

    await ServiceToken.saveToken(isUser._id, tokens.refreshToken);

    return tokens;
  }

  async logout(refreshToken) {
    const payload = await ServiceToken.removeToken(refreshToken);

    return payload;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw { message: 'refreshToken is undefined' };
    }
    const payload = ServiceToken.validateRefreshToken(refreshToken);

    const existInDB = await ServiceToken.existRefreshToken(refreshToken);

    if (!existInDB || !payload) {
      throw { message: 'refreshToken is not verify' };
    }

    const tokens = ServiceToken.generateToken({ userId: payload.userId });

    await ServiceToken.saveToken(payload.userId, tokens.refreshToken);

    return tokens;
  }

  async registration(email, password) {
    const isUser = await UserModel.findOne({ email });

    if (isUser) {
      throw { message: 'this user exist in system...' };
    }
    const hashPassword = await hash(password, 3);

    const newUser = await UserModel.create({ email, password: hashPassword });

    const tokens = ServiceToken.generateToken({ userId: newUser._id });

    await ServiceToken.saveToken(newUser._id, tokens.refreshToken);

    return tokens;
  }
}

export const ServiceUser = new UserService();
