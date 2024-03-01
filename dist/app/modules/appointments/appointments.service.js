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
exports.AppointmentServices = void 0;
const AppError_1 = require("../../errors/AppError");
const user_model_1 = require("../users/user.model");
const appointments_model_1 = require("./appointments.model");
const createAppointmentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = payload === null || payload === void 0 ? void 0 : payload.participantId;
    const userExist = user_model_1.UserModel.findById(userId);
    if (!userExist) {
        throw new AppError_1.AppError(400, "User not found");
    }
    if (userExist === null || userExist === void 0 ? void 0 : userExist.isDeleted) {
        throw new AppError_1.AppError(400, "User is deleted");
    }
    const result = yield appointments_model_1.AppointmentModel.create(payload);
    return result;
});
exports.AppointmentServices = {
    createAppointmentIntoDB,
};
