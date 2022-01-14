import { Request } from 'express';
import { Types } from 'mongoose';

export interface CustomRequest extends Request {
  share: { videoId: Types.ObjectId };
  user: { userId: Types.ObjectId };
  video: { userId: Types.ObjectId; videoId: Types.ObjectId };
}

export interface JwtPayLoad {
  userId: Types.ObjectId;
}

export interface SecretValue {
  DB_URL: string;
  PORT: number;
  SECRET_KEY_ACCESS: string;
  SECRET_KEY_REFRESH: string;
}
