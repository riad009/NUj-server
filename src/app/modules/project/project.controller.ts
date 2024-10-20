import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { ProjectService } from "./project.service";

const createProject = catchAsync(async (req, res, next) => {
  const result = await ProjectService.createProjectIntoDB(req.body);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Created Successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req, res, next) => {
  const ecoSpaceId = req.params.ecoSpaceId;
  const email = req.query.email;
  const role = req.query.role;
  const isCoWorker = req.query.isCoWorker;
  const isOwner = req.query.isOwner;

  const result = await ProjectService.getAllProjectsFromDB(
    ecoSpaceId,
    email as string,
    role as string,
    isCoWorker as string,
    isOwner as string
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: "retrieved successfully",
    data: result,
  });
});

const getSingleProject = catchAsync(async (req, res, next) => {
  const projectId = req.params.projectId;

  const result = await ProjectService.getSingleProjectFromDB(projectId);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "retrieved successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res, next) => {
  const projectId = req.params.projectId;

  const result = await ProjectService.updateProject(projectId, req.body);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "retrieved successfully",
    data: result,
  });
});
const deleteProject = catchAsync(async (req, res, next) => {
  const projectId = req.params.projectId;

  const result = await ProjectService.deleteProject(projectId);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "retrieved successfully",
    data: result,
  });
});

const inviteProject = catchAsync(async (req, res, next) => {
  const { email, projectId, projectName, type } = req?.body;
  console.log("req?.body", req?.body);
  const result = await ProjectService.inviteProject(
    email,
    projectId,
    projectName,
    type
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Invited successfully",
    data: result,
  });
});

const acceptInvite = catchAsync(async (req, res, next) => {
  const { email, projectId } = req?.body;
  const result = await ProjectService.acceptInvite(email, projectId);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Invite accepted successfully",
    data: result,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  getSingleProject,
  acceptInvite,
  inviteProject,
  updateProject,
  deleteProject,
};
