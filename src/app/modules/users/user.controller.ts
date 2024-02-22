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

export const UserControllers = {
  createUser,
};
