import { UserModel } from '../models/user-model';

import { OutUser } from './interfaces';

class UserDB {
  async addUser(email: string, password: string): Promise<OutUser> {
    try {
      const user = await UserModel.create({ email, password });

      return {
        email: user.email,
        id: user._id,
        password: user.password,
      };
    } catch (error) {
      return null;
    }
  }

  async getAllUsers(): Promise<Array<OutUser>> {
    try {
      const users = await UserModel.find();

      if (!users) {
        return null;
      }

      const outUsers: Array<OutUser> = users.map((value: any) => {
        return {
          email: value.email,
          id: value._id,
          password: value.password,
        };
      });

      return outUsers;
    } catch (error) {
      return null;
    }
  }

  async getUser(email: string): Promise<OutUser> {
    const user = await UserModel.findOne({ email });

    return {
      email: user.email,
      id: user._id,
      password: user.password,
    };
  }
}

export const userDB = new UserDB();
