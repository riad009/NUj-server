import mongoose from "mongoose";
import { AppError } from "../../errors/AppError";
import { EcoSpaceDocumentModel } from "../EcoSpaceDocuments/EcoSpaceDocuments.model";
import { UserModel } from "../users/user.model";
import { TEcoSpace } from "./ecoSpaces.interface";
import { EcoSpaceModel } from "./ecoSpaces.model";
import { AppointmentModel } from "../appointments/appointments.model";
import { sendEmail } from "../../helper/sendEmail";
import { TProject } from "../project/project.interface";
import { ProjectModel } from "../project/project.model";

// creating ecospace
const createEcoSpaceIntoDB = async (payload: Partial<TEcoSpace>) => {
  console.log({ payload });

  const userExist = await UserModel.findById(payload?.owner);
  if (!userExist) {
    throw new AppError(400, "User not found");
  }
  if (userExist?.isDeleted) {
    throw new AppError(400, "User not found");
  }
  const { projects, ...newPayload } = payload;

  // const result = (await EcoSpaceModel.create(newPayload)).populate(
  //   "owner serviceId plan"
  // );
  const result = await EcoSpaceModel.create(newPayload);
  if (!result) {
    throw new AppError(400, "Could not create");
  }
  projects?.forEach(async (project) => {
    const newProjectPayload: TProject = {
      ecoSpaceId: result?._id,
      projectName: project,
      email: result?.email,
      clients: [],
    };
    const projectResult = await ProjectModel.create(newProjectPayload);
  });

  return result;
};

// updating single ecospce details by querying with id
const updateEcoSpaceFromDB = async (
  ecoSpaceId: string,
  payload: Partial<TEcoSpace>
) => {
  const result = await EcoSpaceModel.findByIdAndUpdate(ecoSpaceId, payload);
  return result;
};

// inserting new project to the ecospace projects array
const addNewProjectToEcoSpaceFromDB = async (
  ecoSpaceId: string,
  payload: Record<string, any>
) => {
  const result = await EcoSpaceModel.findByIdAndUpdate(ecoSpaceId, {
    $push: { projects: payload?.project },
  });
  return result;
};

// Get single ecospace by id
const getSingleEcoSpaceFromDB = async (ecoSpaceId: string) => {
  const ecoSpace = await EcoSpaceModel.findById(ecoSpaceId).populate("plan");

  return ecoSpace;
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
const getEcoSpacesByOwnerIdFromDB = async (ownerId: string, email: string) => {
  const projects = await ProjectModel.find({ clients: email });

  const projectEcoSpaceIds = projects.map((project) => project.ecoSpaceId);

  const result = await EcoSpaceModel.find({
    $or: [
      { owner: ownerId },
      { coWorkers: { $in: [email] } },
      { _id: { $in: projectEcoSpaceIds } },
    ],
  })
    .sort({ createdAt: -1 })
    .populate("serviceId");

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
  const result = await EcoSpaceModel.find({ serviceId })
    .sort({ createdAt: -1 })
    .populate("serviceId");
  if (!result.length) {
    throw new AppError(400, "No EcoSpaces Found");
  }
  return result;
};

// deleteing ecospace by id
const deleteEcoSpaceFromDB = async (ecoSpaceId: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteEcoSpaceResult = await EcoSpaceModel.findByIdAndDelete(
      ecoSpaceId,
      { session }
    );
    if (!deleteEcoSpaceResult) {
      throw new AppError(400, "Could not delete");
    }

    const deleteAppointmentsResult = await AppointmentModel.deleteMany(
      {
        ecoSpaceId,
      },
      { session }
    );
    if (!deleteAppointmentsResult) {
      throw new AppError(400, "Could not delete");
    }

    await session.commitTransaction();
    await session.endSession();
    return deleteEcoSpaceResult;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, "Could not delete");
  }
};

const inviteEcospace = async (
  email: string,
  ecoSpaceId: string,
  ecoSpaceName: string,
  type: string
) => {
  const ecoSpace = await EcoSpaceModel.findById(ecoSpaceId);

  if (ecoSpace?.coWorkers?.includes(email)) {
    throw new AppError(400, "Co worker already exists!");
  }

  const result = await sendEmail(email, ecoSpaceId, ecoSpaceName, type);

  return result;
};
const acceptInvite = async (email: string, ecoSpaceId: string) => {
  const ecoSpace = await EcoSpaceModel.findById(ecoSpaceId);

  if (!ecoSpace) {
    throw new AppError(400, "Ecospace not found!");
  }

  ecoSpace?.coWorkers.push(email);
  const result = await ecoSpace?.save();

  return result;
};

export const EcoSpaceServices = {
  createEcoSpaceIntoDB,
  getSingleEcoSpaceFromDB,
  getRecentEcoSpacesFromDB,
  getEcoSpacesByOwnerIdFromDB,
  getAllEcoSpacesFromDB,
  getEcoSpacesByServiceIdFromDB,
  deleteEcoSpaceFromDB,
  updateEcoSpaceFromDB,
  addNewProjectToEcoSpaceFromDB,
  inviteEcospace,
  acceptInvite,
};
