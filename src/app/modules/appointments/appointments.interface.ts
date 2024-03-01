import { Types } from "mongoose";

export type TAppointment = {
  participantId: Types.ObjectId;
  ecoSpaceId: Types.ObjectId;
  time: string;
  date: string;
  location: string;
  locationImage: string;
  reason: string;
  isDeleted: boolean;
  isApproved: boolean;
  status: "pending" | "in-progress" | "completed";
};
