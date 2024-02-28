import { Schema, model } from "mongoose";
import { TEcoSpace } from "./ecoSpaces.interface";

const ecoSpaceSchema = new Schema<TEcoSpace>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator must be valid"],
    },
    company: {
      type: String,
      required: [true, "Must provide a valid company name"],
    },
    address: {
      type: String,
      required: [true, "Must provide a valid address"],
    },
    phone: {
      type: String,
      required: [true, "Must provide a valid phone"],
    },
    email: {
      type: String,
      required: [true, "Must provide a valid email"],
    },
    website: {
      type: String,
      required: [true, "Must provide a valid website url"],
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Choose one service"],
    },
    serviceDescription: {
      type: String,
      required: [true, "Must provide a description for service"],
    },
    staffs: {
      type: [String],
      required: false,
    },
    project: {
      type: String,
      required: [true, "Add the project name your company is working on."],
    },
    plan: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    planPurchasedAt: {
      type: String,
      required: false,
      default: new Date(Date.now()).toISOString(),
    },
  },
  {
    timestamps: true,
  }
);

export const EcoSpaceModel = model<TEcoSpace>("EcoSpace", ecoSpaceSchema);
