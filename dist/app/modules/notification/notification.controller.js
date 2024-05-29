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
exports.NotificationController = void 0;
const catchAsync_1 = require("../../middlewares/catchAsync");
const sendResponse_1 = require("../../middlewares/sendResponse");
const notification_service_1 = require("./notification.service");
const createNotification = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_service_1.NotificationService.createNotification(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        status: 200,
        success: true,
        message: "Notification created Successfully",
        data: result,
    });
}));
const getNotification = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_service_1.NotificationService.getNotification(req.query.email);
    (0, sendResponse_1.sendResponse)(res, {
        status: 200,
        success: true,
        message: "My Profile Retrieved Successfully",
        data: result,
    });
}));
const appointmentMail = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_service_1.NotificationService.appointmentMail(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Appointment delete successfully",
        data: result,
    });
}));
const updateNotification = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_service_1.NotificationService.updateNotification(req.params.email);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Appointment delete successfully",
        data: result,
    });
}));
exports.NotificationController = {
    createNotification,
    getNotification,
    appointmentMail,
    updateNotification,
};
