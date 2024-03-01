import { Schema, model } from "mongoose";
import { TEcoSpaceDocument } from "./EcoSpaceDocuments.interface";

const ecoSpaceDocumentSchema = new Schema<TEcoSpaceDocument>(
  {
    ecoSpaceId: {
      type: Schema.Types.ObjectId,
      ref: "EcoSpace",
      required: true,
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

export const EcoSpaceDocumentModel = model<TEcoSpaceDocument>(
  "EcoSpaceDocument",
  ecoSpaceDocumentSchema
);
