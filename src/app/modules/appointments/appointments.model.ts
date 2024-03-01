import { Schema, model } from "mongoose";
import { TAppointment } from "./appointments.interface";

const appointmentSchema = new Schema<TAppointment>(
  {
    participantId: {
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
      type: String,
      required: true,
    },
    locationImage: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "in-progsess", "completed"],
      default: "pending",
      required: true,
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
