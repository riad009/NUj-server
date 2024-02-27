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

export const UserControllers = {
  createUser,
  updateUser,
};
