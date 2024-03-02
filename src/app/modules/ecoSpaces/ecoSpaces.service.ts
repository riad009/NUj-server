import { AppError } from "../../errors/AppError";
import { EcoSpaceDocumentModel } from "../EcoSpaceDocuments/EcoSpaceDocuments.model";
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

// Get single ecospace by id
const getSingleEcoSpaceFromDB = async (ecoSpaceId: string) => {
  const documents = await EcoSpaceDocumentModel.findOne({ ecoSpaceId });
  const ecoSpace = await EcoSpaceModel.findById(ecoSpaceId).populate(
    "serviceId"
  );
  return { documents, ecoSpace };
};

// Getting recent ecospace, this will only return limited ecosapce with limited values
const getRecentEcoSpacesFromDB = async (limit: number) => {
  const result = await EcoSpaceModel.find(
    {},
    { company: 1, project: 1, plan: 1 }
  )
    .sort({ createdAt: -1 })
    .limit(limit);

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

// Getting ecospaces for taking appointment - query(serviceId)
const getEcoSpacesByServiceIdFromDB = async (serviceId: string) => {
  if (!serviceId || serviceId === "null") {
    return await EcoSpaceModel.find({});
  }
  const result = await EcoSpaceModel.find({ serviceId });
  if (!result.length) {
    throw new AppError(400, "No EcoSpaces Found");
  }
  return result;
};

export const EcoSpaceServices = {
  createEcoSpaceIntoDB,
  getSingleEcoSpaceFromDB,
  getRecentEcoSpacesFromDB,
  getEcoSpacesByOwnerIdFromDB,
  getAllEcoSpacesFromDB,
  getEcoSpacesByServiceIdFromDB,
};
