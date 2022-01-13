import { Response } from 'express';
import { Types } from 'mongoose';

import { CustomRequest } from '../interfaces';

export function getVideoId(req: CustomRequest, res: Response, next) {
  const { videoId } = req.params;

  req.video = {
    userId: null,
    videoId: new Types.ObjectId(videoId),
  };

  next();
}

export function getUserId(req: CustomRequest, res: Response, next) {
  const { userId } = req.params;

  req.video = {
    userId: new Types.ObjectId(userId),
    videoId: null,
  };

  next();
}

export function getUserIdAndVideoId(req: CustomRequest, res: Response, next) {
  const { userId, videoId } = req.params;

  req.video = {
    userId: new Types.ObjectId(userId),
    videoId: new Types.ObjectId(videoId),
  };

  next();
}
