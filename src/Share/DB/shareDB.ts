import { Types } from 'mongoose';

import { ShareModel } from '../models/share-model';

export interface OutShare {
  ban: Array<Types.ObjectId>;
  userId: Types.ObjectId;
  videoId: Types.ObjectId;
}

class ShareDB {
  async addAccess(usersId: Array<Types.ObjectId>, videoId: Types.ObjectId): Promise<OutShare> {
    try {
      const isShare = await ShareModel.findOne({ videoId });

      if (!isShare) {
        return null;
      }
      isShare.ban = isShare.ban.filter((elem) => {
        const isUser = usersId.find((element) => {
          return element.equals(elem);
        });

        return !isUser;
      });

      await isShare.save();

      const outData: OutShare = {
        ban: isShare.ban,
        userId: isShare.userId,
        videoId,
      };

      return outData;
    } catch (error) {
      return null;
    }
  }

  async addBan(usersId: Array<Types.ObjectId>, videoId: Types.ObjectId): Promise<OutShare> {
    try {
      const isShare = await ShareModel.findOne({ videoId });

      if (!isShare) {
        return null;
      }

      isShare.ban += usersId.filter((elem) => {
        const isUser = isShare.ban.find((element: Types.ObjectId) => {
          return element.toString() == elem.toString();
        });

        return !isUser;
      });

      await isShare.save();

      const outData: OutShare = {
        ban: isShare.ban,
        userId: isShare.userId,
        videoId,
      };

      return outData;
    } catch (error) {
      return null;
    }
  }

  async addShare(userId: Types.ObjectId, videoId: Types.ObjectId, usersId: Array<Types.ObjectId>): Promise<OutShare> {
    const newShare = new ShareModel({ ban: usersId, userId, videoId });

    await newShare.save();

    const outData: OutShare = {
      ban: newShare.ban,
      userId: newShare.userId,
      videoId,
    };

    return outData;
  }

  async checkAccess(checkUser: Types.ObjectId, videoId: Types.ObjectId): Promise<boolean> {
    try {
      const isShare = await ShareModel.findOne({ videoId });

      if (!isShare) {
        return false;
      }

      const isUser = isShare.ban.find((element: Types.ObjectId) => {
        return element.toString() == checkUser.toString();
      });

      return !isUser;
    } catch (error) {
      return false;
    }
  }

  async delShare(videoId: Types.ObjectId): Promise<OutShare> {
    try {
      const delShare = await ShareModel.findOneAndDelete({ videoId });

      if (!delShare) {
        return null;
      }
      const outData: OutShare = {
        ban: delShare.ban,
        userId: delShare.userId,
        videoId,
      };

      return outData;
    } catch (error) {
      return null;
    }
  }
}

export const shareDB = new ShareDB();
