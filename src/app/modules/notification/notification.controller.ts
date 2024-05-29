import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { NotificationService } from "./notification.service";

const createNotification = catchAsync(async (req, res, next) => {
  const result = await NotificationService.createNotification(req.body);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Notification created Successfully",
    data: result,
  });
});

const getNotification = catchAsync(async (req, res, next) => {
  const result = await NotificationService.getNotification(req.query.email);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "My Profile Retrieved Successfully",
    data: result,
  });
});

const appointmentMail = catchAsync(async (req, res, next) => {
  const result = await NotificationService.appointmentMail(req.body);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Appointment delete successfully",
    data: result,
  });
});

const updateNotification = catchAsync(async (req, res, next) => {
  const result = await NotificationService.updateNotification(req.params.email);

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Appointment delete successfully",
    data: result,
  });
});

export const NotificationController = {
  createNotification,
  getNotification,
  appointmentMail,
  updateNotification,
};
