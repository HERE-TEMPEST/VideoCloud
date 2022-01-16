/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';

import { shareController } from './controllers/controllerShare';
import { getVideoId } from './middleWare';

export const routeShare = Router();

routeShare.put('/access/:videoId', getVideoId, shareController.access); //+
routeShare.put('/accessAll/:videoId', getVideoId, shareController.accessAll); //+
routeShare.put('/ban/:videoId', getVideoId, shareController.ban); //+
routeShare.put('/banAll/:videoId', getVideoId, shareController.banAll); //+
