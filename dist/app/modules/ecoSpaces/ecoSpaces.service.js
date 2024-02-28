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
exports.EcoSpaceServices = void 0;
const AppError_1 = require("../../errors/AppError");
const user_model_1 = require("../users/user.model");
const ecoSpaces_model_1 = require("./ecoSpaces.model");
// creating ecospace
const createEcoSpaceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_model_1.UserModel.findById(payload === null || payload === void 0 ? void 0 : payload.owner);
    if (!userExist) {
        throw new AppError_1.AppError(401, "User not found");
    }
    if (userExist === null || userExist === void 0 ? void 0 : userExist.isDeleted) {
        throw new AppError_1.AppError(401, "User not found");
    }
    const result = (yield ecoSpaces_model_1.EcoSpaceModel.create(payload)).populate("owner serviceId plan");
    return result;
});
// Getting recent ecospace, this will only return limited ecosapce with limited values
const getRecentEcoSpacesFromDB = (limit) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ecoSpaces_model_1.EcoSpaceModel.find({}, { company: 1, project: 1, plan: 1 })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("plan");
    return result;
});
exports.EcoSpaceServices = {
    createEcoSpaceIntoDB,
    getRecentEcoSpacesFromDB,
};
