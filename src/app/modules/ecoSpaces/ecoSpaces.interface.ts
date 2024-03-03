import { Types } from "mongoose";

export type TEcoSpace = {
  owner: Types.ObjectId;
  company: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  serviceId: Types.ObjectId;
  serviceDescription: string;
  staffs: string[];
  project: string;
  plan?: Types.ObjectId;
  planPurchasedAt?: string;
  planPrice?: string;
  ecoSpaceNotify: boolean;
  isDeleted: boolean;
  generalDocument: string;
  voice: string;
  video: string;
};
