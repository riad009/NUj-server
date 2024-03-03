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
exports.AppointmentControllers = void 0;
const catchAsync_1 = require("../../middlewares/catchAsync");
const sendResponse_1 = require("../../middlewares/sendResponse");
const appointments_service_1 = require("./appointments.service");
const createAppointment = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    console.log({ payload });
    const result = yield appointments_service_1.AppointmentServices.createAppointmentIntoDB(payload);
    (0, sendResponse_1.sendResponse)(res, {
        status: 200,
        success: true,
        message: "Appointment Successfull",
        data: result,
    });
}));
const getRecentAppointment = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit);
    const result = yield appointments_service_1.AppointmentServices.getRecentAppointmentFromDB(limit || 5);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Recent Appointments retrieved successfully",
        data: result,
    });
}));
const getEcoSpaceAppointments = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ecoSpaceId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.ecoSpaceId;
    const result = yield appointments_service_1.AppointmentServices.getEcoSpaceAppointmentsFromDB(ecoSpaceId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Appointments retrieved successfully",
        data: result,
    });
}));
const getSingleAppointment = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const appointmentId = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.appointmentId;
    const result = yield appointments_service_1.AppointmentServices.getSingleAppointmentFromDB(appointmentId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Appointment Details retrieved successfully",
        data: result,
    });
}));
const approveAppointment = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const appointmentId = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.appointmentId;
    const result = yield appointments_service_1.AppointmentServices.approveAppointmentFromDB(appointmentId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Appointment is Approved",
        data: result,
    });
}));
const completeAppointment = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const appointmentId = (_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.appointmentId;
    const result = yield appointments_service_1.AppointmentServices.completeAppointmentFromDB(appointmentId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Appointment is marked completed",
        data: result,
    });
}));
const updateLocationImage = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req === null || req === void 0 ? void 0 : req.file;
    const result = yield appointments_service_1.AppointmentServices.updateLocationImage(file);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Appointment location image uploaded",
        data: result,
    });
}));
const getAppointmentsForSingleUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const userId = (_e = req === null || req === void 0 ? void 0 : req.params) === null || _e === void 0 ? void 0 : _e.userId;
    const result = yield appointments_service_1.AppointmentServices.getAppointmentsForSingleUserFromDB(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Appointments are retrieved successfully",
        data: result,
    });
}));
exports.AppointmentControllers = {
    createAppointment,
    getRecentAppointment,
    getEcoSpaceAppointments,
    getSingleAppointment,
    approveAppointment,
    completeAppointment,
    getAppointmentsForSingleUser,
    updateLocationImage,
};
