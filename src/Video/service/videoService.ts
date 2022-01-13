import { Express } from 'express';
import fs from 'fs';
import { Types } from 'mongoose';
import { extname } from 'path/posix';

import { MyError } from '../../Error';
import { shareDB } from '../../Share/DB/shareDB';
import { ServiceUser } from '../../User/service/serviceUser';
import { InVideo, OutVideo } from '../DB/interfaces';
import { videoDB } from '../DB/videoDB';

interface DelVideo {
  message: string;
  video: OutVideo;
}

class VideoService {
  async delete(userId: Types.ObjectId, videoId: Types.ObjectId): Promise<DelVideo> {
    const video = await videoDB.delVideo(userId, videoId);

    if (!video) {
      throw new MyError('video not found', 404);
    }

    await shareDB.delShare(video.videoId);

    fs.rmSync(video.path);

    return {
      message: 'file deleted',
      video,
    };
  }

  async download(userId: Types.ObjectId, videoId: Types.ObjectId): Promise<fs.ReadStream> {
    const video = await videoDB.getVideo(userId, videoId);

    if (!video) {
      throw new MyError('video not found', 404);
    }

    const a = fs.createReadStream(video.path);

    return a;
    // pipe(res);
  }

  async update(userId: Types.ObjectId, videoId: Types.ObjectId, newname: string): Promise<OutVideo> {
    const isUpdate = await videoDB.editVideo(userId, videoId, newname);

    if (!isUpdate) {
      throw new MyError('video not found', 404);
    }

    return isUpdate;
  }

  async upload(userId: Types.ObjectId, file: Express.Multer.File): Promise<OutVideo> {
    const inData: InVideo = {
      name: file.originalname,
      path: file.path,
      systemname: file.filename,
      type: extname(file.originalname),
    };

    const newVideo = await videoDB.addVideo(userId, inData);

    if (!newVideo) {
      throw new MyError('video exist in user', 404);
    }

    let users: Array<Types.ObjectId> = await ServiceUser.getAllUsers();

    // users
    users = users.filter((element) => {
      return element != userId;
    });

    const newShare = await shareDB.addShare(userId, newVideo.videoId, users);

    if (!newShare) {
      await videoDB.delVideo(newVideo.userId, newVideo.videoId);

      throw new Error('error in upload');
    }

    return newVideo;
  }

  async uservideo(Id: Types.ObjectId, userId: Types.ObjectId, videoId: Types.ObjectId): Promise<OutVideo> {
    const video = await videoDB.getVideo(userId, videoId);

    if (!video) {
      throw new MyError('video not found', 404);
    }
    const isAccess = await shareDB.checkAccess(Id, video.videoId);

    if (!isAccess) {
      throw new MyError('video not found', 404);
    }

    return video;
  }

  async uservideos(Id: Types.ObjectId, userId: Types.ObjectId): Promise<Array<OutVideo>> {
    const videos = await videoDB.getAllVideo(userId);

    if (!videos) {
      throw new MyError('videos not found', 404);
    }

    const accessVideos: Array<OutVideo> = [];

    for (let index = 0; index < videos.length; index++) {
      const isAccess = await shareDB.checkAccess(Id, videos[index].videoId);

      if (isAccess) {
        accessVideos.push(videos[index]);
      }
    }

    if (!accessVideos.length) {
      throw new MyError('videos not found', 404);
    }

    return accessVideos;
  }

  async videos(userId: Types.ObjectId) {
    const videos = await videoDB.getAllVideo(userId);

    if (!videos.length) {
      throw new MyError('videos not found', 404);
    }

    return videos;
  }
}

export const videoService = new VideoService();
