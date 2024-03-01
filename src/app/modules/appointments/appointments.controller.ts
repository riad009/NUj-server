import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { AppointmentServices } from "./appointments.service";

const createAppointment = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await AppointmentServices.createAppointmentIntoDB(payload);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Appointment Successfull",
    data: result,
  });
});

export const AppointmentControllers = {
  createAppointment,
};
