import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { AppointmentServices } from "./appointments.service";

const createAppointment = catchAsync(async (req, res, next) => {
  const payload = req.body;

  console.log({ payload });

  const result = await AppointmentServices.createAppointmentIntoDB(payload);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Appointment Successfull",
    data: result,
  });
});

const getRecentAppointment = catchAsync(async (req, res, next) => {
  const limit = Number(req.query.limit);
  const result = await AppointmentServices.getRecentAppointmentFromDB(
    limit || 5
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Recent Appointments retrieved successfully",
    data: result,
  });
});

const getEcoSpaceAppointments = catchAsync(async (req, res, next) => {
  const ecoSpaceId = req?.params?.ecoSpaceId;
  const result = await AppointmentServices.getEcoSpaceAppointmentsFromDB(
    ecoSpaceId
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Appointments retrieved successfully",
    data: result,
  });
});

const getSingleAppointment = catchAsync(async (req, res, next) => {
  const appointmentId = req?.params?.appointmentId;
  const result = await AppointmentServices.getSingleAppointmentFromDB(
    appointmentId
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Appointment Details retrieved successfully",
    data: result,
  });
});

const approveAppointment = catchAsync(async (req, res, next) => {
  const appointmentId = req?.params?.appointmentId;
  const result = await AppointmentServices.approveAppointmentFromDB(
    appointmentId
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Appointment is Approved",
    data: result,
  });
});

const completeAppointment = catchAsync(async (req, res, next) => {
  const appointmentId = req?.params?.appointmentId;
  const result = await AppointmentServices.completeAppointmentFromDB(
    appointmentId
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Appointment is marked completed",
    data: result,
  });
});

const updateLocationImage = catchAsync(async (req, res, next) => {
  const file = req?.file;
  const result = await AppointmentServices.updateLocationImage(file);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Appointment location image uploaded",
    data: result,
  });
});

const getAppointmentsForSingleUser = catchAsync(async (req, res, next) => {
  const userId = req?.params?.userId;
  const result = await AppointmentServices.getAppointmentsForSingleUserFromDB(
    userId
  );

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Appointments are retrieved successfully",
    data: result,
  });
});

export const AppointmentControllers = {
  createAppointment,
  getRecentAppointment,
  getEcoSpaceAppointments,
  getSingleAppointment,
  approveAppointment,
  completeAppointment,
  getAppointmentsForSingleUser,
  updateLocationImage,
};
