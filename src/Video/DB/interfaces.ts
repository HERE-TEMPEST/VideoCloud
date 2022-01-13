import { Types } from 'mongoose';

export interface InVideo {
  name: string;
  path: string;
  systemname: string;
  type: string;
}

export interface OutVideo extends InVideo {
  created: string;
  path: string;
  systemname: string;
  updated: string;
  userId: Types.ObjectId;
  videoId: Types.ObjectId;
}
