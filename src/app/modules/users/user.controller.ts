import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { UserServices } from "./user.service";

const createGoogleUser = catchAsync(async (req, res) => {
  console.log("inside google");
  const result = await UserServices.createGoogleUser(req.body);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Google user successfully",
    data: result,
  });
});

const signup = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await UserServices.signup(payload);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "User created successfully",
    data: result,
  });
});

const signin = catchAsync(async (req, res) => {
  const result = await UserServices.signin(req.body);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "User signed in successfully",
    data: result,
  });
});

const getUserProfile = catchAsync(async (req, res) => {
  const result = await UserServices.getUserProfile(req?.user?.email);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "User profile got successfully!",
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

const updateImage = catchAsync(async (req, res, next) => {
  const result = await UserServices.updateImage(req.params.userId, req.file);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "User image updated successfully",
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

const deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;

  const result = await UserServices.deleteUser(userId);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "User deleted!",
    data: result,
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const result = await UserServices.forgotPassword(req.body);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Password Reset link sent!",
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const result = await UserServices.resetPassword(req.body);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Password reset success!",
    data: result,
  });
});

export const UserControllers = {
  signup,
  updateUser,
  updateNotify,
  getAllUsers,
  getSingleUser,
  updateImage,
  signin,
  createGoogleUser,
  getUserProfile,
  deleteUser,
  forgotPassword,
  resetPassword,
};
