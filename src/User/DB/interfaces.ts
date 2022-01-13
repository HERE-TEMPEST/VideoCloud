import { Types } from 'mongoose';

export interface OutToken {
  refreshToken: string;
  userId: Types.ObjectId;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
