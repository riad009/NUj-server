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
    description: {
      type: String,
      required: false,
    },

    phone: {
      type: String,
      required: [true, "Must provide a valid phone"],
    },
    email: {
      type: String,
      required: [true, "Must provide a valid email"],
    },
    address: {
      type: String,
      required: [true, "Must provide a valid address"],
    },
    website: {
      type: String,
      required: [true, "Must provide a valid website url"],
    },
    serviceId: {
      type: [Schema.Types.ObjectId],
      ref: "Service",
      required: [true, "Choose one service"],
    },
    // serviceDescription: {
    //   type: String,
    //   required: [true, "Must provide a description for service"],
    // },

    coWorkers: {
      type: [String],
      required: false,
    },
    // projects: {
    //   type: [String],
    //   required: [true, "Add the project name your company is working on."],
    // },
    plan: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
      required: false,
    },
    planPrice: {
      type: Number,
      required: false,
      min: 0,
    },
    planPurchasedAt: {
      type: String,
      required: false,
      default: new Date(Date.now()).toISOString(),
    },
    ecoSpaceNotify: {
      type: Boolean,
      required: false,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    generalDocument: {
      type: String,
      required: false,
    },
    voice: {
      type: String,
      required: false,
    },
    video: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const EcoSpaceModel = model<TEcoSpace>("EcoSpace", ecoSpaceSchema);
