import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { ProjectService } from "./project.service";

const createProject = catchAsync(async (req, res, next) => {
  const result = await req.body;

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Created Successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req, res, next) => {
  const ecoSpaceId = req.params.ecoSpaceId;

  const result = await ProjectService.getAllProjectsFromDB(ecoSpaceId);

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

export const ProjectController = {
  createProject,
  getAllProjects,
  getSingleProject,
};
