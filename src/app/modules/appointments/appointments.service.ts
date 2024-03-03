import config from "../../config";
import { AppError } from "../../errors/AppError";
import { UserModel } from "../users/user.model";
import { TAppointment } from "./appointments.interface";
import { AppointmentModel } from "./appointments.model";
import cloudinary from "cloudinary";
// creating appointment
const createAppointmentIntoDB = async (payload: TAppointment) => {
  const userId = payload?.participantId;

  const userExist = UserModel.findById(userId);

  if (!userExist) {
    throw new AppError(400, "User not found");
  }
  if (userExist?.isDeleted) {
    throw new AppError(400, "User is deleted");
  }

  const result = await AppointmentModel.create(payload);
  return result;
};

// getting recent appointments
const getRecentAppointmentFromDB = async (limit: number) => {
  const result = await AppointmentModel.find(
    {},
    { participantId: 1, ecoSpaceId: 1, reason: 1 }
  )
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("participantId ecoSpaceId");

  return result;
};

// getting ecospace specific appointments (querying by id)
const getEcoSpaceAppointmentsFromDB = async (ecoSpaceId: string) => {
  const result = await AppointmentModel.find({ ecoSpaceId }).populate(
    "participantId"
  );
  return result;
};

// get single appointment by _id
const getSingleAppointmentFromDB = async (appointmentId: string) => {
  const result = await AppointmentModel.findById(appointmentId).populate(
    "ecoSpaceId participantId"
  );
  return result;
};

const approveAppointmentFromDB = async (appointmentId: string) => {
  const result = await AppointmentModel.findByIdAndUpdate(appointmentId, {
    isApproved: true,
    status: "in-progress",
  });
  return result;
};

const completeAppointmentFromDB = async (appointmentId: string) => {
  const result = await AppointmentModel.findByIdAndUpdate(appointmentId, {
    isApproved: true,
    status: "completed",
  });
  return result;
};

// getting all appointments for a single user
const getAppointmentsForSingleUserFromDB = async (userId: string) => {
  const result = await AppointmentModel.find({
    participantId: userId,
  }).populate("ecoSpaceId");
  return result;
};

cloudinary.v2.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

const updateLocationImage = async (file: any) => {
  if (!file) {
    throw new Error("File not found");
  }

  const result = await cloudinary.v2.uploader.upload(file.path);

  return result.secure_url;
};

export const AppointmentServices = {
  createAppointmentIntoDB,
  getRecentAppointmentFromDB,
  getEcoSpaceAppointmentsFromDB,
  getSingleAppointmentFromDB,
  approveAppointmentFromDB,
  completeAppointmentFromDB,
  getAppointmentsForSingleUserFromDB,
  updateLocationImage,
};
