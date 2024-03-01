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
exports.GeneralControllers = void 0;
const catchAsync_1 = require("../../middlewares/catchAsync");
const sendResponse_1 = require("../../middlewares/sendResponse");
const general_service_1 = require("./general.service");
const getStatistics = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield general_service_1.GeneralServices.getStatisticsFromDB();
    (0, sendResponse_1.sendResponse)(res, {
        status: 200,
        success: true,
        message: "Statistics Retrieved Successfully",
        data: result,
    });
}));
const getMyProfile = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const result = yield general_service_1.GeneralServices.getMyProfileFromDB(email);
    (0, sendResponse_1.sendResponse)(res, {
        status: 200,
        success: true,
        message: "My Profile Retrieved Successfully",
        data: result,
    });
}));
exports.GeneralControllers = {
    getStatistics,
    getMyProfile,
};
