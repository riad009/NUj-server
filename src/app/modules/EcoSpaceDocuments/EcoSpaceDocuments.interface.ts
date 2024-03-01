import { Types } from "mongoose";

export type TEcoSpaceDocument = {
  ecoSpaceId: Types.ObjectId;
  generalDocument: string;
  voice: string;
  video: string;
};
