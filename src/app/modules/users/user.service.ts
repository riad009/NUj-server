import { AppError } from "../../errors/AppError";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (payload: Partial<TUser>) => {
  const isExist = await UserModel.findOne({ email: payload?.email });
  if (isExist) {
    throw new AppError(400, "User Already exists");
  }
  const result = await UserModel.create(payload);
  return result;
};

const updateUserFromDB = async (userId: string, payload: Partial<TUser>) => {
  const oldUser = await UserModel.findById(userId);
  if (!oldUser) {
    throw new AppError(401, "User not found");
  }
  if (oldUser?.isDeleted) {
    throw new AppError(400, "User is deletd");
  }

  const result = await UserModel.findByIdAndUpdate(userId, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  updateUserFromDB,
};
