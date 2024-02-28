import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { EcoSpaceServices } from "./ecoSpaces.service";

const createEcoSpace = catchAsync(async (req, res, next) => {
  const result = await EcoSpaceServices.createEcoSpaceIntoDB(req.body);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "EcoSpace created successfully",
    data: result,
  });
});

export const EcoSpaceControllers = {
  createEcoSpace,
};
