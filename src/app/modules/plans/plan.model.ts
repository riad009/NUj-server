import { Schema, model } from "mongoose";
import { TPlan } from "./plan.interface";

const planSchema = new Schema<TPlan>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const PlanModel = model<TPlan>("Plan", planSchema);
