import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    ecoSpaceId: {
      type: Schema.Types.ObjectId,
      ref: "EcoSpace",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
      required: false,
      default: "https://i.ibb.co/LCR1TRF/dummy.jpg",
    },
    message: {
      type: String,
      required: false,
    },
    audio: {
      type: String,
      required: false,
    },
    video: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = model("Message", messageSchema);
