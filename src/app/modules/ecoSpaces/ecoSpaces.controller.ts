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

const updateEcoSpace = catchAsync(async (req, res, next) => {
  const ecoSpaceId = req?.params?.ecoSpaceId;
  const payload = req?.body;

  const result = await EcoSpaceServices.updateEcoSpaceFromDB(
    ecoSpaceId,
    payload
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: "EcoSpace Updated successfully",
    data: result,
  });
});

const addNewProjectToEcoSpace = catchAsync(async (req, res, next) => {
  const ecoSpaceId = req?.params?.ecoSpaceId;
  const payload = req?.body;

  const result = await EcoSpaceServices.addNewProjectToEcoSpaceFromDB(
    ecoSpaceId,
    payload
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Project added successfully",
    data: result,
  });
});

const getSingleEcoSpace = catchAsync(async (req, res, next) => {
  const result = await EcoSpaceServices.getSingleEcoSpaceFromDB(
    req.params.ecoSpaceId
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: "EcoSpace Found successfully",
    data: result,
  });
});

const getRecentEcoSpaces = catchAsync(async (req, res, next) => {
  const limit = Number(req.query.limit);
  const result = await EcoSpaceServices.getRecentEcoSpacesFromDB(limit || 5);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Recent EcoSpaces retrieved successfully",
    data: result,
  });
});

const getEcoSpacesByOwnerId = catchAsync(async (req, res, next) => {
  const ownerId = req?.query?.ownerId;
  const email = req?.query?.email;
  console.log({ email });
  const result = await EcoSpaceServices.getEcoSpacesByOwnerIdFromDB(
    ownerId as string,
    email as string
  );

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

const getEcoSpacesByServiceId = catchAsync(async (req, res, next) => {
  const serviceId = req?.params?.serviceId;
  const result = await EcoSpaceServices.getEcoSpacesByServiceIdFromDB(
    serviceId as string
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: "EcoSpaces retrieved successfully",
    data: result,
  });
});

const deleteEcoSpace = catchAsync(async (req, res, next) => {
  const ecoSpaceId = req?.params?.ecoSpaceId;
  const result = await EcoSpaceServices.deleteEcoSpaceFromDB(ecoSpaceId);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "EcoSpace deleted successfully",
    data: result,
  });
});

const inviteEcospace = catchAsync(async (req, res, next) => {
  const { email, ecoSpaceId, ecoSpaceName, type } = req?.body;
  const result = await EcoSpaceServices.inviteEcospace(
    email,
    ecoSpaceId,
    ecoSpaceName,
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
  const { email, ecoSpaceId } = req?.body;
  const result = await EcoSpaceServices.acceptInvite(email, ecoSpaceId);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Invite accepted successfully",
    data: result,
  });
});

export const EcoSpaceControllers = {
  createEcoSpace,
  getSingleEcoSpace,
  getRecentEcoSpaces,
  getEcoSpacesByOwnerId,
  getAllEcoSpaces,
  getEcoSpacesByServiceId,
  deleteEcoSpace,
  updateEcoSpace,
  addNewProjectToEcoSpace,
  inviteEcospace,
  acceptInvite,
};
