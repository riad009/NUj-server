import { Schema, model } from "mongoose";
import { TProject } from "./project.interface";

const projectSchema = new Schema<TProject>(
  {
    ecoSpaceId: {
      type: Schema.Types.ObjectId,
      ref: "EcoSpace",
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    clients: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const ProjectModel = model<TProject>("Project", projectSchema);
