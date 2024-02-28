import { AppError } from "../../errors/AppError";
import { UserModel } from "../users/user.model";
import { TEcoSpace } from "./ecoSpaces.interface";
import { EcoSpaceModel } from "./ecoSpaces.model";

// creating ecospace
const createEcoSpaceIntoDB = async (payload: Partial<TEcoSpace>) => {
  const userExist = await UserModel.findById(payload?.owner);
  if (!userExist) {
    throw new AppError(400, "User not found");
  }
  if (userExist?.isDeleted) {
    throw new AppError(400, "User not found");
  }

  const result = (await EcoSpaceModel.create(payload)).populate(
    "owner serviceId plan"
  );
  return result;
};

// Getting recent ecospace, this will only return limited ecosapce with limited values
const getRecentEcoSpacesFromDB = async (limit: number) => {
  const result = await EcoSpaceModel.find(
    {},
    { company: 1, project: 1, plan: 1 }
  )
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("plan");

  return result;
};

// getting list of ecospaces for a single user by _id(owner)
const getEcoSpacesByOwnerIdFromDB = async (ownerId: string) => {
  const result = await EcoSpaceModel.find({ owner: ownerId });
  return result;
};

// getting all the ecospaces for admin only
const getAllEcoSpacesFromDB = async () => {
  const result = await EcoSpaceModel.find({});
  return result;
};

export const EcoSpaceServices = {
  createEcoSpaceIntoDB,
  getRecentEcoSpacesFromDB,
  getEcoSpacesByOwnerIdFromDB,
  getAllEcoSpacesFromDB,
};
