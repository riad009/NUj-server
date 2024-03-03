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
exports.UserServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = require("../../errors/AppError");
const user_model_1 = require("./user.model");
const cloudinary_1 = __importDefault(require("cloudinary"));
// Creating user
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.UserModel.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (isExist) {
        throw new AppError_1.AppError(200, "User Already exists");
    }
    const result = yield user_model_1.UserModel.create(payload);
    return result;
});
// getting all the users
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find({ role: "user" });
    return result;
});
// get single user with _id
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findById(userId);
    return result;
});
// Updating user
const updateUserFromDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const oldUser = yield user_model_1.UserModel.findById(userId);
    if (!oldUser) {
        throw new AppError_1.AppError(401, "User not found");
    }
    if (oldUser === null || oldUser === void 0 ? void 0 : oldUser.isDeleted) {
        throw new AppError_1.AppError(400, "User is deleted");
    }
    const result = yield user_model_1.UserModel.findByIdAndUpdate(userId, payload, {
        new: true,
        upsert: true,
    });
    console.log(payload);
    return result;
});
cloudinary_1.default.v2.config({
    cloud_name: config_1.default.cloud_name,
    api_key: config_1.default.api_key,
    api_secret: config_1.default.api_secret,
});
const updateImage = (userId, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new Error("File not found");
    }
    const result = yield cloudinary_1.default.v2.uploader.upload(file.path);
    const user = yield user_model_1.UserModel.findByIdAndUpdate(userId, {
        $set: {
            photo: result.secure_url,
        },
    }, { new: true });
    return user;
});
// updating is notification preferences
const updateNotifyFromDB = (userId, isNotify) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findByIdAndUpdate(userId, { isNotify });
    return result;
});
exports.UserServices = {
    createUserIntoDB,
    updateUserFromDB,
    updateNotifyFromDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateImage,
};
