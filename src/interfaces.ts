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
