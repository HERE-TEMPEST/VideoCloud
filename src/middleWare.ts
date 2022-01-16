import { Response } from 'express';
import multer from 'multer';
import path from 'path/posix';

import { MyError } from './Error';
import { CustomRequest } from './interfaces';
import { tokenDB } from './User/DB/tokenDB';

export function tokenVerify(req: CustomRequest, res: Response, next) {
  const [, token] = req.headers.authorization.split(' ');

  if (!token) {
    return next(new MyError('user not registred', 401));
  }
  const payload = tokenDB.validateAccessToken(token);

  if (!payload) {
    return next(new MyError("token isn't valid", 401));
  }
  req.user = { userId: payload.userId };

  next();
}

export const upload = multer({
  dest: './uploads/',
  fileFilter: (req: CustomRequest, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext === '.mp4' || ext === '.3gp' || ext === '.mov' || ext === '.webm') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});
