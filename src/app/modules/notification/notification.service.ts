import { sendAppointmentEmail } from "../../helper/sendAppointmentEmail";
import { Notification } from "./notification.model";

const createNotification = async (payload: any) => {
  const result = await Notification.create(payload);

  return result;
};

const getNotification = async (email: any) => {
  const result = await Notification.find({ email }).sort({ createdAt: -1 });
  return result;
};
const updateNotification = async (id: any) => {
  const result = await Notification.findByIdAndUpdate(id, { isViewed: true });
  return result;
};

const deleteNotification = async (id: any) => {
  const result = await Notification.findByIdAndDelete(id);
  return result;
};
// const updateNotification = async (email: any) => {
//   console.log("nottii", { email });
//   const result = await Notification.findOneAndUpdate(
//     { email },
//     { isViewed: true }
//   );
//   return result;
// };

const appointmentMail = async (payload: any) => {
  const { email, name, text } = payload;

  await sendAppointmentEmail(email, name, text);

  payload.message = text;
  const result = await Notification.create(payload);

  return result;
};

export const NotificationService = {
  getNotification,
  createNotification,
  appointmentMail,
  updateNotification,
  deleteNotification,
};
