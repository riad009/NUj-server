import { AppError } from "../../errors/AppError";
import { UserModel } from "../users/user.model";
import { TAppointment } from "./appointments.interface";
import { AppointmentModel } from "./appointments.model";

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

export const AppointmentServices = {
  createAppointmentIntoDB,
};
