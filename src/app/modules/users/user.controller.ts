import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await UserServices.createUserIntoDB(payload);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "User created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Users list retrieved successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const result = await UserServices.getSingleUserFromDB(userId);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "User data retrieved successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const result = await UserServices.updateUserFromDB(
    req.params.userId,
    req.body
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: "User updated successfully",
    data: result as object,
  });
});

const updateNotify = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const isNotify = Boolean(req.body.isNotify);
  const result = await UserServices.updateNotifyFromDB(userId, isNotify);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Notification preference updated successfully",
    data: null,
  });
});

export const UserControllers = {
  createUser,
  updateUser,
  updateNotify,
  getAllUsers,
  getSingleUser,
};
