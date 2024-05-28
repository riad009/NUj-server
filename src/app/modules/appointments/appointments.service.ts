import config from "../../config";
import { AppError } from "../../errors/AppError";
import { sendAppointmentEmail } from "../../helper/sendAppointmentEmail";
import { UserModel } from "../users/user.model";
import { AppointmentModel } from "./appointments.model";
import cloudinary from "cloudinary";
// creating appointment
const createAppointmentIntoDB = async (payload: any) => {
  const userEmail = payload?.userEmail;

  const userExist: any = await UserModel.findOne({ email: userEmail });

  if (!userExist) {
    throw new AppError(400, "User not found");
  }

  // @ts-ignore
  if (userExist?.isDeleted) {
    throw new AppError(400, "User is deleted");
  }

  payload.userId = userExist?._id;

  const result = await AppointmentModel.create(payload);
  return result;
};

// getting recent appointments
const getRecentAppointmentFromDB = async (limit: number) => {
  const result = await AppointmentModel.find(
    {},
    { userId: 1, ecoSpaceId: 1, status: 1 }
  )
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("userId ecoSpaceId");

  return result;
};

// getting ecospace specific appointments (querying by id)
const getEcoSpaceAppointmentsFromDB = async (ecoSpaceId: string) => {
  const result = await AppointmentModel.find({ ecoSpaceId })
    .sort({ date: -1 })
    .populate("userId");
  return result;
};

// get single appointment by _id
const getSingleAppointmentFromDB = async (appointmentId: string) => {
  const result = await AppointmentModel.findById(appointmentId).populate(
    "ecoSpaceId userId"
  );
  return result;
};

const approveAppointmentFromDB = async (appointmentId: string) => {
  const result = await AppointmentModel.findByIdAndUpdate(appointmentId, {
    status: "in-progress",
  });
  return result;
};

const completeAppointmentFromDB = async (
  appointmentId: string,
  status: string
) => {
  console.log({ appointmentId, status });

  const result = await AppointmentModel.findByIdAndUpdate(appointmentId, {
    status,
  });
  return result;
};

const getRequestedAppointments = async (
  userId: string,
  requestedBy: string,
  ecoSpaceId: string,
  query: string
) => {
  let findQuery;
  if (query === "requested") {
    findQuery = {
      $and: [
        { $or: [{ userId: userId }, { requestedBy: requestedBy }] },
        { ecoSpaceId: ecoSpaceId },
      ],
    };
  } else if (query === "requests") {
    findQuery = {
      $and: [{ ecoSpaceId: ecoSpaceId }, { status: "in-progress" }],
    };
  } else {
    findQuery = {};
  }

  const result = await AppointmentModel.find(findQuery);
  return result;
};
const getAppointmentsForSingleUserFromDB = async (userId: string) => {
  const result = await AppointmentModel.find({
    userId: userId,
  }).populate("ecoSpaceId");
  return result;
};

const deleteAppointment = async (id: string) => {
  const result = await AppointmentModel.findByIdAndDelete(id);
  return result;
};

const appointmentMail = async (payload: any) => {
  const { email, name, status } = payload;

  console.log({ status });
  const result = await sendAppointmentEmail(email, name, status);
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
  getRequestedAppointments,
  deleteAppointment,
  appointmentMail,
};
