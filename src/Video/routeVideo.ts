/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, Router } from 'express';

import { upload } from '../middleWare';
import { videoController } from '../Video/controllers/controllerVideo';

import { getVideoId, getUserIdAndVideoId, getUserId } from './middleWare';

export const routeVideo = Router();

routeVideo.delete('/:videoId', getVideoId, videoController.delete); //+
routeVideo.get('/:videoId', getVideoId, videoController.download); //+
routeVideo.get('/', videoController.videos); //+
routeVideo.get('/users/:userId/:videoId', getUserIdAndVideoId, videoController.uservideo); //+
routeVideo.get('/users/:userId/', getUserId, videoController.uservideos); //+
routeVideo.post('/', upload.single('video'), videoController.upload); //+-delVideo kogda error
routeVideo.put('/:videoId', getVideoId, videoController.update); //+

routeVideo.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;

  res.status(status);
  res.json({
    message,
    status,
  });
});
