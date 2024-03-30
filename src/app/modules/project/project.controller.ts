import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";

const createProject = catchAsync(async (req, res, next) => {
  const result = await req.body;

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Created Successfully",
    data: result,
  });
});

export const ProjectController = {
  createProject,
};
