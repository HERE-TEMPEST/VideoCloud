import { Response } from 'express';
import multer from 'multer';
import path from 'path/posix';

import { CustomRequest } from './interfaces';
import { ServiceToken } from './User/service/serviceToken';

export function tokenVerify(req: CustomRequest, res: Response, next) {
  const [, token] = req.headers.authorization.split(' ');

  if (!token) {
    return res.status(403).json('user not registred');
  }
  const payload = ServiceToken.validateAccessToken(token);

  if (!payload) {
    return res.status(400).json({ message: "this token isn't valid" });
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
