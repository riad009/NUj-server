import { AppError } from "../../errors/AppError";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

// Creating user
const createUserIntoDB = async (payload: Partial<TUser>) => {
  const isExist = await UserModel.findOne({ email: payload?.email });
  if (isExist) {
    throw new AppError(400, "User Already exists");
  }
  const result = await UserModel.create(payload);
  return result;
};

// getting all the users
const getAllUsersFromDB = async () => {
  const result = await UserModel.find({ role: "user" });
  return result;
};

// get single user with _id
const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findById(userId);
  return result;
};

// Updating user
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
    upsert: true,
  });
  return result;
};

// updating is notification preferences
const updateNotifyFromDB = async (userId: string, isNotify: boolean) => {
  const result = await UserModel.findByIdAndUpdate(userId, { isNotify });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  updateUserFromDB,
  updateNotifyFromDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
