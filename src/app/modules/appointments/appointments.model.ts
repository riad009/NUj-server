import { Schema, model } from "mongoose";
import { TAppointment, TLocation } from "./appointments.interface";

const locationSchema = new Schema<TLocation>({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

const appointmentSchema = new Schema<TAppointment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ecoSpaceId: {
      type: Schema.Types.ObjectId,
      ref: "EcoSpace",
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    location: {
      type: locationSchema,
      required: false,
    },

    appointmentLength: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "in-progsess", "approved", "rejected"],
      default: "pending",
      required: true,
    },
    destinationInformation: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const AppointmentModel = model<TAppointment>(
  "Appointment",
  appointmentSchema
);
