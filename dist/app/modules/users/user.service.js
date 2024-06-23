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
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = require("../../errors/AppError");
const resetMail_1 = require("../../helper/resetMail");
const user_model_1 = require("./user.model");
const cloudinary_1 = __importDefault(require("cloudinary"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createGoogleUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    const isUserExist = yield user_model_1.UserModel.isUserExist(email);
    const token = jwtHelper_1.jwtHelpers.createToken({
        email,
        role: "user",
    });
    if (isUserExist) {
        return token;
    }
    yield user_model_1.UserModel.create(payload);
    return token;
});
// Creating user
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    console.log({ payload });
    const isUserExist = yield user_model_1.UserModel.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (isUserExist) {
        throw new AppError_1.AppError(500, "User already exists");
    }
    const user = yield user_model_1.UserModel.create(payload);
    const token = jwtHelper_1.jwtHelpers.createToken({
        email,
        role: user.role || "user",
    });
    return token;
});
const signin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.UserModel.findOne({ email });
    if (!isUserExist) {
        throw new AppError_1.AppError(5000, "User does not exist");
    }
    console.log("password", password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    const isPasswordMatch = isUserExist.password &&
        (yield user_model_1.UserModel.isPasswordMatch(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password));
    if (!isPasswordMatch) {
        throw new AppError_1.AppError(400, "Incorrect password!");
    }
    const token = jwtHelper_1.jwtHelpers.createToken({
        email: email,
        role: isUserExist.role,
        id: isUserExist._id,
    });
    return token;
});
const getUserProfile = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({
        email,
    });
    return result;
});
// getting all the users
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const roles = ["user", "admin"];
    const result = yield user_model_1.UserModel.find({ role: { $in: roles } });
    return result;
});
// get single user with _id
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findById(userId);
    return result;
});
// delete
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findByIdAndDelete(userId);
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
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    const user = yield user_model_1.UserModel.findOne({ email });
    if (!user) {
        throw new AppError_1.AppError(500, "User not found");
    }
    const token = jsonwebtoken_1.default.sign({ email }, "nujsecret", {
        expiresIn: "1h",
    });
    user.resetPasswordToken = token;
    yield user.save();
    yield (0, resetMail_1.resetMail)(email, token);
    return "Mail sent";
});
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword, token } = payload;
    console.log({ payload });
    const decoded = jwtHelper_1.jwtHelpers.verifyToken(token);
    console.log({ decoded, token });
    const { email } = decoded;
    const user = yield user_model_1.UserModel.findOne({ email });
    if (!user || user.resetPasswordToken !== token) {
        throw new AppError_1.AppError(500, "Invalid token");
    }
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    const result = yield user.save();
    return result;
});
exports.UserServices = {
    signup,
    updateUserFromDB,
    updateNotifyFromDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateImage,
    signin,
    createGoogleUser,
    getUserProfile,
    deleteUser,
    forgotPassword,
    resetPassword,
};
