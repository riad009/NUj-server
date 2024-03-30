import { TProject } from "./project.interface";
import { ProjectModel } from "./project.model";

const createProjectIntoDB = async (payload: TProject) => {
  const result = await ProjectModel.create(payload);
  return result;
};

export const ProjectService = {
  createProjectIntoDB,
};
