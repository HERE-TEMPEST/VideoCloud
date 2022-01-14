import { Types } from 'mongoose';

export interface OutToken {
  refreshToken: string;
  userId: Types.ObjectId;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface OutUser {
  email: string;
  id: Types.ObjectId;
  password: string;
}
