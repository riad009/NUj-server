import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },

    isViewed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = model("Notification", notificationSchema);
