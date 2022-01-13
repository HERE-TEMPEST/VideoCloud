import { Response } from 'express';
import { Types } from 'mongoose';

import { CustomRequest } from '../../interfaces';
import { shareService } from '../service/shareService';

class controllerShare {
  async access(req: CustomRequest, res: Response, next) {
    try {
      let { usersId } = req.body;

      usersId = usersId.map((element) => {
        return new Types.ObjectId(element);
      });

      console.log(usersId);

      const share = await shareService.access(usersId, req.share.videoId);

      return res.status(200).json(share);
    } catch (error) {
      console.log('error', error);

      return next(error);
    }
  }

  async accessAll(req: CustomRequest, res: Response, next) {
    try {
      const share = await shareService.accessAll(req.user.userId, req.share.videoId);

      return res.status(200).json(share);
    } catch (error) {
      console.log('error', error);

      return next(error);
    }
  }

  async ban(req: CustomRequest, res: Response, next) {
    try {
      const { usersId } = req.body;

      const share = await shareService.ban(usersId, req.share.videoId);

      return res.status(200).json(share);
    } catch (error) {
      console.log('error', error);

      return next(error);
    }
  }

  async banAll(req: CustomRequest, res: Response, next) {
    try {
      const share = await shareService.banAll(req.user.userId, req.share.videoId);

      return res.status(200).json(share);
    } catch (error) {
      console.log('error', error);

      return next(error);
    }
  }
}

export const shareController = new controllerShare();
