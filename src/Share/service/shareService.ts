import { Types } from 'mongoose';

import { MyError } from '../../Error';
import { ServiceUser } from '../../User/service/serviceUser';
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
    let users = await ServiceUser.getAllUsers();

    users = users.filter((element) => {
      return element != userId;
    });

    const share = await shareDB.addAccess(users, videoId);

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
    let users = await ServiceUser.getAllUsers();

    users = users.filter((element) => {
      return element != userId;
    });

    const share = await shareDB.addBan(users, videoId);

    return share;
  }
}

export const shareService = new ShareService();
