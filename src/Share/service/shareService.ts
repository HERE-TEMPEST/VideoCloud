import { Types } from 'mongoose';

import { MyError } from '../../Error';
import { userDB } from '../../User/DB/userDB';
import { shareDB } from '../DB/shareDB';
//import { videoDB } from '../../Video/DB/videoDB';

class ShareService {
  async access(usersId: Array<Types.ObjectId>, videoId: Types.ObjectId) {
    const share = await shareDB.addAccess(usersId, videoId);

    if (!share) {
      throw new MyError('video not found', 404);
    }

    return share;
  }

  async accessAll(userId: Types.ObjectId, videoId: Types.ObjectId) {
    const users = await userDB.getAllUsers();

    const usersId: Array<Types.ObjectId> = users.reduce((prev, element) => {
      if (!element.id.equals(userId)) {
        prev.push(element.id);
      }

      return prev;
    }, Array<Types.ObjectId>());

    const share = await shareDB.addAccess(usersId, videoId);

    if (!share) {
      throw new MyError('video not found', 404);
    }

    return share;
  }

  async ban(usersId: Array<Types.ObjectId>, videoId: Types.ObjectId) {
    const share = await shareDB.addBan(usersId, videoId);

    if (!share) {
      throw new MyError('video not found', 404);
    }

    return share;
  }

  async banAll(userId: Types.ObjectId, videoId: Types.ObjectId) {
    const users = await userDB.getAllUsers();

    const usersId: Array<Types.ObjectId> = users.reduce((prev, element) => {
      if (!element.id.equals(userId)) {
        prev.push(element.id);
      }

      return prev;
    }, Array<Types.ObjectId>());

    const share = await shareDB.addBan(usersId, videoId);

    return share;
  }
}

export const shareService = new ShareService();
