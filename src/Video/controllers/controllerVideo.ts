/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from 'express';
import { Types } from 'mongoose';

import { MyError } from '../../Error';
import { CustomRequest } from '../../interfaces';
import { videoService } from '../service/videoService';

class ControllerVideo {
  async delete(req: CustomRequest, res: Response, next) {
    try {
      const delVideo = await videoService.delete(req.user.userId, req.video.videoId);

      return res.status(200).json(delVideo);
    } catch (error) {
      console.log('error: ', error.message);

      return next(error);
    }
  }

  async download(req: CustomRequest, res: Response, next) {
    try {
      console.log('download:', req.video);

      const streamVideo = await videoService.download(req.user.userId, req.video.videoId);

      return streamVideo.pipe(res);
    } catch (error) {
      console.log('error: ', error);

      return next(error);
    }
  }

  async update(req: CustomRequest, res: Response, next) {
    try {
      const { newname } = req.body;

      const updateVideo = await videoService.update(req.user.userId, req.video.videoId, newname);

      return res.status(200).json(updateVideo);
    } catch (error) {
      console.log('error: ', error);

      return next(error);
    }
  }

  async upload(req: CustomRequest, res: Response, next) {
    try {
      const uploadVideo = await videoService.upload(req.user.userId, req.file);

      return res.status(200).json(uploadVideo);
    } catch (error) {
      return next(error);
    }
  }

  async uservideo(req: CustomRequest, res: Response, next) {
    try {
      const { userId, videoId } = req.video;

      const userVideo = await videoService.uservideo(req.user.userId, userId, videoId);

      return res.status(200).json(userVideo);
    } catch (error) {
      console.log('error: ', error);

      return next(error);
    }
  }

  async uservideos(req: CustomRequest, res: Response, next) {
    try {
      const userVideos = await videoService.uservideos(req.user.userId, req.video.userId);

      return res.status(200).json(userVideos);
    } catch (error) {
      console.log('error: ', error);

      return next(error);
    }
  }

  async videos(req: CustomRequest, res: Response, next) {
    try {
      const userVideos = await videoService.videos(req.user.userId);

      return res.status(200).json(userVideos);
    } catch (error) {
      console.log('error: ', error);

      return next(error);
    }
  }
}

export const videoController = new ControllerVideo();
