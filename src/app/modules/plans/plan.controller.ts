import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { PlanServices } from "./plan.service";

const createPlan = catchAsync(async (req, res, next) => {
  const result = await PlanServices.createPlanIntoDB(req.body);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "User updated successfully",
    data: result,
  });
});

export const PlanControllers = {
  createPlan,
};
