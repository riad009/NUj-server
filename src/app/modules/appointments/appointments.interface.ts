import { Types } from "mongoose";

export type TLocation = {
  lat: number;
  lng: number;
};

export type TAppointment = {
  userId: Types.ObjectId;
  requestedBy: Types.ObjectId;
  ecoSpaceId: Types.ObjectId;
  time: string;
  date: string;
  location: TLocation;
  locationImage: string;
  businessName: string;
  address: string;
  appointmentLength: string;
  status: "pending" | "in-progress" | "completed";
  destinationInformation: string;
};
