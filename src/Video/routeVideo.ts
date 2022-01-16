/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, Router } from 'express';

import { upload } from '../middleWare';
import { videoController } from '../Video/controllers/controllerVideo';

import { getVideoId, getUserIdAndVideoId, getUserId } from './middleWare';

export const routeVideo = Router();

routeVideo.delete('/:videoId', getVideoId, videoController.delete);
routeVideo.get('/:videoId', getVideoId, videoController.download);
routeVideo.get('/', videoController.videos);
routeVideo.get('/users/:userId/:videoId', getUserIdAndVideoId, videoController.uservideo);
routeVideo.get('/users/:userId/', getUserId, videoController.uservideos);
routeVideo.post('/', upload.single('video'), videoController.upload);
routeVideo.put('/:videoId', getVideoId, videoController.update);
