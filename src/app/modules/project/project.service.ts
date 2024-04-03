import { TProject } from "./project.interface";
import { ProjectModel } from "./project.model";

const createProjectIntoDB = async (payload: TProject) => {
  const result = await ProjectModel.create(payload);
  return result;
};

const getAllProjectsFromDB = async (ecoSpaceId: string) => {
  const result = await ProjectModel.find({ ecoSpaceId }).sort({ createdAt: 1 });
  return result;
};
const getSingleProjectFromDB = async (id: string) => {
  const result = await ProjectModel.findById(id);
  return result;
};

export const ProjectService = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getSingleProjectFromDB,
};
