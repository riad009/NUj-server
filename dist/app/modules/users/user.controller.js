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
exports.UserControllers = void 0;
const catchAsync_1 = require("../../middlewares/catchAsync");
const sendResponse_1 = require("../../middlewares/sendResponse");
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield user_service_1.UserServices.createUserIntoDB(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "User created successfully",
        data: result,
    });
}));
const getAllUsers = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.getAllUsersFromDB();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Users list retrieved successfully",
        data: result,
    });
}));
const getSingleUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const result = yield user_service_1.UserServices.getSingleUserFromDB(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "User data retrieved successfully",
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.updateUserFromDB(req.params.userId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "User updated successfully",
        data: result,
    });
}));
const updateImage = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.updateImage(req.params.userId, req.file);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "User image updated successfully",
        data: result,
    });
}));
const updateNotify = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const isNotify = Boolean(req.body.isNotify);
    const result = yield user_service_1.UserServices.updateNotifyFromDB(userId, isNotify);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Notification preference updated successfully",
        data: null,
    });
}));
exports.UserControllers = {
    createUser,
    updateUser,
    updateNotify,
    getAllUsers,
    getSingleUser,
    updateImage,
};
