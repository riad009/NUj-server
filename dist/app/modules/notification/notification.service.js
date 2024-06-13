"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const sendAppointmentEmail_1 = require("../../helper/sendAppointmentEmail");
const notification_model_1 = require("./notification.model");
const createNotification = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_model_1.Notification.create(payload);
    return result;
});
const getNotification = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_model_1.Notification.find({ email }).sort({ createdAt: -1 });
    return result;
});
const updateNotification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_model_1.Notification.findByIdAndUpdate(id, { isViewed: true });
    return result;
});
const deleteNotification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_model_1.Notification.findByIdAndDelete(id);
    return result;
});
// const updateNotification = async (email: any) => {
//   console.log("nottii", { email });
//   const result = await Notification.findOneAndUpdate(
//     { email },
//     { isViewed: true }
//   );
//   return result;
// };
const appointmentMail = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, text } = payload;
    yield (0, sendAppointmentEmail_1.sendAppointmentEmail)(email, name, text);
    payload.message = text;
    const result = yield notification_model_1.Notification.create(payload);
    return result;
});
exports.NotificationService = {
    getNotification,
    createNotification,
    appointmentMail,
    updateNotification,
    deleteNotification,
};
