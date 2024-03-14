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
      type: locationSchema,
      required: false,
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
    neighbourhood: {
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
