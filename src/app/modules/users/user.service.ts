import { jwtHelpers } from "../../../helpers/jwtHelper";
import config from "../../config";
import { AppError } from "../../errors/AppError";
import { resetMail } from "../../helper/resetMail";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import cloudinary from "cloudinary";
import jwt from "jsonwebtoken";

const createGoogleUser = async (payload: any) => {
  const { email } = payload;

  const isUserExist = await UserModel.isUserExist(email);

  const token = jwtHelpers.createToken({
    email,
    role: "user",
  });

  if (isUserExist) {
    return token;
  }

  await UserModel.create(payload);
  return token;
};

// Creating user
const signup = async (payload: Partial<TUser>) => {
  const { email } = payload;

  console.log({ payload });

  const isUserExist = await UserModel.findOne({ email: payload?.email });

  if (isUserExist) {
    throw new AppError(500, "User already exists");
  }

  const user = await UserModel.create(payload);

  const token = jwtHelpers.createToken({
    email,
    role: user.role || "user",
  });

  return token;
};

const signin = async (payload: any) => {
  const { email, password } = payload;

  const isUserExist = await UserModel.findOne({ email });

  if (!isUserExist) {
    throw new AppError(5000, "User does not exist");
  }

  console.log("password", password, isUserExist?.password);

  const isPasswordMatch =
    isUserExist.password &&
    (await UserModel.isPasswordMatch(password, isUserExist?.password));

  if (!isPasswordMatch) {
    throw new AppError(400, "Incorrect password!");
  }

  const token = jwtHelpers.createToken({
    email: email,
    role: isUserExist.role,
    id: isUserExist._id,
  });

  return token;
};

const getUserProfile = async (email: string) => {
  const result = await UserModel.findOne({
    email,
  });

  return result;
};

// getting all the users
const getAllUsersFromDB = async () => {
  const roles = ["user", "admin"];
  const result = await UserModel.find({ role: { $in: roles } });
  return result;
};

// get single user with _id
const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findById(userId);
  return result;
};

// delete
const deleteUser = async (userId: string) => {
  const result = await UserModel.findByIdAndDelete(userId);
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

const forgotPassword = async (payload: any) => {
  const { email } = payload;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError(500, "User not found");
  }

  const token = jwt.sign({ email }, "nujsecret", {
    expiresIn: "1h",
  });
  user.resetPasswordToken = token;
  await user.save();

  await resetMail(email, token);

  return "Mail sent";
};

const resetPassword = async (payload: any) => {
  const { newPassword, token } = payload;

  console.log({ payload });

  const decoded = jwtHelpers.verifyToken(token);
  console.log({ decoded, token });
  const { email } = decoded;

  const user = await UserModel.findOne({ email });

  if (!user || user.resetPasswordToken !== token) {
    throw new AppError(500, "Invalid token");
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;

  const result = await user.save();

  return result;
};

export const UserServices = {
  signup,
  updateUserFromDB,
  updateNotifyFromDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateImage,
  signin,
  createGoogleUser,
  getUserProfile,
  deleteUser,
  forgotPassword,
  resetPassword,
};
