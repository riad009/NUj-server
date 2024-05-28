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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = require("../../errors/AppError");
const user_model_1 = require("../users/user.model");
const appointments_model_1 = require("./appointments.model");
const cloudinary_1 = __importDefault(require("cloudinary"));
// creating appointment
const createAppointmentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = payload === null || payload === void 0 ? void 0 : payload.userEmail;
    const userExist = yield user_model_1.UserModel.findOne({ email: userEmail });
    if (!userExist) {
        throw new AppError_1.AppError(400, "User not found");
    }
    // @ts-ignore
    if (userExist === null || userExist === void 0 ? void 0 : userExist.isDeleted) {
        throw new AppError_1.AppError(400, "User is deleted");
    }
    payload.userId = userExist === null || userExist === void 0 ? void 0 : userExist._id;
    const result = yield appointments_model_1.AppointmentModel.create(payload);
    return result;
});
// getting recent appointments
const getRecentAppointmentFromDB = (limit) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointments_model_1.AppointmentModel.find({}, { userId: 1, ecoSpaceId: 1, status: 1 })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("userId ecoSpaceId");
    return result;
});
// getting ecospace specific appointments (querying by id)
const getEcoSpaceAppointmentsFromDB = (ecoSpaceId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointments_model_1.AppointmentModel.find({ ecoSpaceId })
        .sort({ date: -1 })
        .populate("userId");
    return result;
});
// get single appointment by _id
const getSingleAppointmentFromDB = (appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointments_model_1.AppointmentModel.findById(appointmentId).populate("ecoSpaceId userId");
    return result;
});
const approveAppointmentFromDB = (appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointments_model_1.AppointmentModel.findByIdAndUpdate(appointmentId, {
        status: "in-progress",
    });
    return result;
});
const completeAppointmentFromDB = (appointmentId, status) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ appointmentId, status });
    const result = yield appointments_model_1.AppointmentModel.findByIdAndUpdate(appointmentId, {
        status,
    });
    return result;
});
const getRequestedAppointments = (userId, requestedBy, ecoSpaceId, query) => __awaiter(void 0, void 0, void 0, function* () {
    let findQuery;
    if (query === "requested") {
        findQuery = {
            $and: [
                { $or: [{ userId: userId }, { requestedBy: requestedBy }] },
                { ecoSpaceId: ecoSpaceId },
            ],
        };
    }
    else if (query === "requests") {
        findQuery = {
            $and: [{ ecoSpaceId: ecoSpaceId }, { status: "in-progress" }],
        };
    }
    else {
        findQuery = {};
    }
    const result = yield appointments_model_1.AppointmentModel.find(findQuery);
    return result;
});
const getAppointmentsForSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointments_model_1.AppointmentModel.find({
        userId: userId,
    }).populate("ecoSpaceId");
    return result;
});
const deleteAppointment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointments_model_1.AppointmentModel.findByIdAndDelete(id);
    return result;
});
cloudinary_1.default.v2.config({
    cloud_name: config_1.default.cloud_name,
    api_key: config_1.default.api_key,
    api_secret: config_1.default.api_secret,
});
const updateLocationImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new Error("File not found");
    }
    const result = yield cloudinary_1.default.v2.uploader.upload(file.path);
    return result.secure_url;
});
exports.AppointmentServices = {
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
};
