import { Response } from 'express';
import { Types } from 'mongoose';

import { CustomRequest } from '../interfaces';

export function getVideoId(req: CustomRequest, res: Response, next) {
  const { videoId } = req.params;

  req.share = {
    videoId: new Types.ObjectId(videoId),
  };

  next();
}
