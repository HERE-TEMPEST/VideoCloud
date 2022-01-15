import { Types } from 'mongoose';

import { VideoModel } from '../models/schemaVideo';

import { InVideo, OutVideo } from './interfaces';

class VideoDB {
  async addVideo(userId: Types.ObjectId, file: InVideo): Promise<OutVideo> {
    try {
      const { name, path, systemname, type } = file;

      const isVideo = await VideoModel.findOne({ name, userId });

      if (isVideo) {
        return null;
      }

      const newVideo = await VideoModel.create({
        name,
        path,
        systemname,
        type,
        userId,
      });

      const outputDate: OutVideo = {
        created: newVideo.createdAt,
        name: newVideo.name,
        path: newVideo.path,
        systemname: newVideo.systemname,
        type: newVideo.type,
        updated: newVideo.updatedAt,
        userId,
        videoId: newVideo._id,
      };

      console.log('newVideo: ', newVideo);

      return outputDate;
    } catch (error) {
      return null;
    }
  }

  async delVideo(userId: Types.ObjectId, videoId: Types.ObjectId): Promise<OutVideo> {
    try {
      const delFile = await VideoModel.findOneAndDelete({ _id: videoId, userId });

      if (!delFile) {
        return null;
      }

      const outputDate: OutVideo = {
        created: delFile.createdAt,
        name: delFile.name,
        path: delFile.path,
        systemname: delFile.systemname,
        type: delFile.type,
        updated: delFile.updatedAt,
        userId,
        videoId: delFile._id,
      };

      return outputDate;
    } catch (error) {
      return null;
    }
  }

  async editVideo(userId: Types.ObjectId, videoId: Types.ObjectId, newname: string): Promise<OutVideo> {
    try {
      const isVideo = await VideoModel.findOne({ _id: videoId, userId });

      if (!isVideo) {
        return null;
      }

      isVideo.name = newname;

      const updateVideo = await isVideo.save();

      const outputDate: OutVideo = {
        created: updateVideo.createdAt,
        name: updateVideo.name,
        path: updateVideo.path,
        systemname: updateVideo.systemname,
        type: updateVideo.type,
        updated: updateVideo.updatedAt,
        userId,
        videoId: updateVideo._id,
      };

      return outputDate;
    } catch (error) {
      return null;
    }
  }

  async getAllVideo(userId: Types.ObjectId): Promise<Array<OutVideo>> {
    try {
      const areVideos = await VideoModel.find({ userId });

      if (!areVideos) {
        return null;
      }

      const outputFiles: Array<OutVideo> = areVideos.map((element) => {
        const video: OutVideo = {
          created: element.createdAt,
          name: element.name,
          path: element.path,
          systemname: element.systemname,
          type: element.type,
          updated: element.updatedAt,
          userId,
          videoId: element._id,
        };

        return video;
      });

      return outputFiles;
    } catch (error) {
      return null;
    }
  }

  async getVideo(userId: Types.ObjectId, videoId: Types.ObjectId): Promise<OutVideo> {
    try {
      console.log('videoId: ', videoId);

      const isVideo = await VideoModel.findOne({ _id: videoId, userId });

      console.log('isVideo: ', isVideo);

      if (!isVideo) {
        return null;
      }

      const outputDate: OutVideo = {
        created: isVideo.createdAt,
        name: isVideo.name,
        path: isVideo.path,
        systemname: isVideo.systemname,
        type: isVideo.type,
        updated: isVideo.updatedAt,
        userId,
        videoId: isVideo._id,
      };

      return outputDate;
    } catch (error) {
      return null;
    }
  }
}

export const videoDB = new VideoDB();
