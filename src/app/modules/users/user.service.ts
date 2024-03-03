import config from "../../config";
import { AppError } from "../../errors/AppError";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import cloudinary from "cloudinary";
// Creating user
const createUserIntoDB = async (payload: Partial<TUser>) => {
  const isExist = await UserModel.findOne({ email: payload?.email });
  if (isExist) {
    throw new AppError(200, "User Already exists");
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
    throw new AppError(400, "User is deleted");
  }

  const result = await UserModel.findByIdAndUpdate(userId, payload, {
    new: true,
    upsert: true,
  });
  console.log(payload);
  return result;
};

cloudinary.v2.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

const updateImage = async (userId: string, file: any) => {
  if (!file) {
    throw new Error("File not found");
  }

  const result = await cloudinary.v2.uploader.upload(file.path);

  const user = await UserModel.findByIdAndUpdate(
    userId,
    {
      $set: {
        photo: result.secure_url,
      },
    },
    { new: true }
  );

  return user;
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
  updateImage,
};
