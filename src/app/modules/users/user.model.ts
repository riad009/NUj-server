import { Schema, model } from "mongoose";
import { IUserModel, TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
const userSchema = new Schema<TUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: false,
      default: "user",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
      // select: 0,
    },
    phone: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: false,
      default: "https://i.ibb.co/mcHGwPy/dummy.jpg",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: String,
      required: false,
    },
    isNotify: {
      type: Boolean,
      default: true,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: false,
    },
    plan: {
      type: String,
      required: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // hash password
  if (this.password) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds)
    );
  }

  next();
});

userSchema.statics.isPasswordMatch = async function (givenPass, savedPass) {
  const isMatch = await bcrypt.compare(givenPass, savedPass);

  return isMatch;
};

userSchema.statics.isUserExist = async function (email) {
  const user = await UserModel.findOne(
    { email },
    { email: 1, password: 1, role: 1 }
  ).lean();

  return user;
};

export const UserModel = model<TUser, IUserModel>("User", userSchema);
