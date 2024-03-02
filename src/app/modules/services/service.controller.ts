import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { ServiceServices } from "./service.service";

const createService = catchAsync(async (req, res, next) => {
  const result = await ServiceServices.createServiceIntoDB(req.body);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Service created successfully",
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res, next) => {
  const result = await ServiceServices.getAllServicesFromDB();

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Service created successfully",
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  getAllServices,
};
