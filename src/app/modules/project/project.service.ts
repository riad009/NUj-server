import { AppError } from "../../errors/AppError";
import { sendEmail } from "../../helper/sendEmail";
import { TProject } from "./project.interface";
import { ProjectModel } from "./project.model";

const createProjectIntoDB = async (payload: TProject) => {
  const result = await ProjectModel.create(payload);
  return result;
};

const getAllProjectsFromDB = async (
  ecoSpaceId: string,
  email?: string,
  role?: string,
  isCoWorker?: string,
  isOwner?: string
) => {
  let query: any = { ecoSpaceId };
  const userrole = "user" || "admin";
  if (
    email &&
    userrole &&
    isCoWorker === "false" &&
    isOwner === "false" &&
    role !== "superAdmin"
  ) {
    query = { ...query, clients: email };
  }

  console.log({ query });

  const result = await ProjectModel.find(query).sort({ createdAt: 1 });
  return result;
};
const getSingleProjectFromDB = async (id: string) => {
  const result = await ProjectModel.findById(id);
  return result;
};

const deleteProject = async (id: string) => {
  const result = await ProjectModel.findByIdAndDelete(id);
  return result;
};

const inviteProject = async (
  email: string,
  projectId: string,
  projectName: string,
  type: string
) => {
  const project = await ProjectModel.findById(projectId);
  if (project?.clients?.includes(email)) {
    throw new AppError(400, "Client already exists!");
  }

  const result = await sendEmail(email, projectId, projectName, type);

  return result;
};
const acceptInvite = async (email: string, projectId: string) => {
  console.log({ email, projectId });

  const project = await ProjectModel.findById(projectId);

  if (!project) {
    throw new AppError(400, "Ecospace not found!");
  }

  project?.clients.push(email);
  const result = await project?.save();

  return result;
};

export const ProjectService = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getSingleProjectFromDB,
  inviteProject,
  acceptInvite,
  deleteProject,
};
