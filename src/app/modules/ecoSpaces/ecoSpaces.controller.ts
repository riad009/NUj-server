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

const getRecentEcoSpaces = catchAsync(async (req, res, next) => {
  const limit = Number(req.query.limit);
  const result = await EcoSpaceServices.getRecentEcoSpacesFromDB(limit || 3);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Recent EcoSpaces retrieved successfully",
    data: result,
  });
});

const getEcoSpacesByOwnerId = catchAsync(async (req, res, next) => {
  const ownerId = req.params.ownerId;
  const result = await EcoSpaceServices.getEcoSpacesByOwnerIdFromDB(ownerId);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "EcoSpaces retrieved successfully",
    data: result,
  });
});

const getAllEcoSpaces = catchAsync(async (req, res, next) => {
  const result = await EcoSpaceServices.getAllEcoSpacesFromDB();

  sendResponse(res, {
    success: true,
    status: 200,
    message: "EcoSpaces retrieved successfully",
    data: result,
  });
});

export const EcoSpaceControllers = {
  createEcoSpace,
  getRecentEcoSpaces,
  getEcoSpacesByOwnerId,
  getAllEcoSpaces,
};
