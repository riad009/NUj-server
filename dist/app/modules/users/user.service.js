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
exports.UserServices = void 0;
const AppError_1 = require("../../errors/AppError");
const user_model_1 = require("./user.model");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.UserModel.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (isExist) {
        throw new AppError_1.AppError(400, "User Already exists");
    }
    const result = yield user_model_1.UserModel.create(payload);
    return result;
});
const updateUserFromDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const oldUser = yield user_model_1.UserModel.findById(userId);
    if (!oldUser) {
        throw new AppError_1.AppError(401, "User not found");
    }
    if (oldUser === null || oldUser === void 0 ? void 0 : oldUser.isDeleted) {
        throw new AppError_1.AppError(400, "User is deletd");
    }
    const result = yield user_model_1.UserModel.findByIdAndUpdate(userId, payload, {
        new: true,
        upsert: true,
    });
    return result;
});
const updateNotifyFromDB = (userId, isNotify) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findByIdAndUpdate(userId, { isNotify });
    return result;
});
exports.UserServices = {
    createUserIntoDB,
    updateUserFromDB,
    updateNotifyFromDB,
};
