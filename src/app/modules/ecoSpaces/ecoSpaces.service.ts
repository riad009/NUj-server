import { AppError } from "../../errors/AppError";
import { UserModel } from "../users/user.model";
import { TEcoSpace } from "./ecoSpaces.interface";
import { EcoSpaceModel } from "./ecoSpaces.model";

const createEcoSpaceIntoDB = async (payload: Partial<TEcoSpace>) => {
  const userExist = await UserModel.findById(payload?.owner);
  if (!userExist) {
    throw new AppError(401, "User not found");
  }
  if (userExist?.isDeleted) {
    throw new AppError(401, "User not found");
  }

  const result = (await EcoSpaceModel.create(payload)).populate(
    "owner serviceId plan"
  );
  return result;
};

export const EcoSpaceServices = {
  createEcoSpaceIntoDB,
};
