import { Types } from "mongoose";

export type TProject = {
  ecoSpaceId: Types.ObjectId;
  projectName: string;
  email: string;
  clients: string[];
};
