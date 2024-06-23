import { Model } from "mongoose";

export type TUser = {
  name: string;
  role: "admin" | "user";
  phone: string;
  email: string;
  photo: string;
  isNotify: boolean;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  address: string;
  plan: string;
  isDeleted: boolean;
  password: string;
  resetPasswordToken: string | undefined;
};

export type IUserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<TUser, "name" | "password" | "role" | "email">>;
  isPasswordMatch(givenPass: string, savedPass: string): Promise<boolean>;
} & Model<TUser>;
