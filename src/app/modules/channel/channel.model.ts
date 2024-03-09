import { Schema, model } from "mongoose";

const channelSchema = new Schema(
  {
    ecoSpaceId: {
      type: Schema.Types.ObjectId,
      ref: "EcoSpace",
      required: true,
    },
    channelName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Channel = model("Channel", channelSchema);
