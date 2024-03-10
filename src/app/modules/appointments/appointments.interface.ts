import { Types } from "mongoose";

export type TLocation = {
  lat: number;
  lng: number;
};

export type TAppointment = {
  participantId: Types.ObjectId;
  ecoSpaceId: Types.ObjectId;
  time: string;
  date: string;
  location: TLocation;
  locationImage: string;
  reason: string;
  isDeleted: boolean;
  isApproved: boolean;
  status: "pending" | "in-progress" | "completed";
  neighbourhood: string;
};
