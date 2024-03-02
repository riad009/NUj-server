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
const EcoSpaceDocuments_model_1 = require("../EcoSpaceDocuments/EcoSpaceDocuments.model");
const user_model_1 = require("../users/user.model");
const ecoSpaces_model_1 = require("./ecoSpaces.model");
// creating ecospace
const createEcoSpaceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_model_1.UserModel.findById(payload === null || payload === void 0 ? void 0 : payload.owner);
    if (!userExist) {
        throw new AppError_1.AppError(400, "User not found");
    }
    if (userExist === null || userExist === void 0 ? void 0 : userExist.isDeleted) {
        throw new AppError_1.AppError(400, "User not found");
    }
    const result = (yield ecoSpaces_model_1.EcoSpaceModel.create(payload)).populate("owner serviceId plan");
    return result;
});
// Get single ecospace by id
const getSingleEcoSpaceFromDB = (ecoSpaceId) => __awaiter(void 0, void 0, void 0, function* () {
    const documents = yield EcoSpaceDocuments_model_1.EcoSpaceDocumentModel.findOne({ ecoSpaceId });
    const ecoSpace = yield ecoSpaces_model_1.EcoSpaceModel.findById(ecoSpaceId).populate("serviceId");
    return { documents, ecoSpace };
});
// Getting recent ecospace, this will only return limited ecosapce with limited values
const getRecentEcoSpacesFromDB = (limit) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ecoSpaces_model_1.EcoSpaceModel.find({}, { company: 1, project: 1, plan: 1 })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("plan");
    return result;
});
// getting list of ecospaces for a single user by _id(owner)
const getEcoSpacesByOwnerIdFromDB = (ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ecoSpaces_model_1.EcoSpaceModel.find({ owner: ownerId });
    return result;
});
// getting all the ecospaces for admin only
const getAllEcoSpacesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ecoSpaces_model_1.EcoSpaceModel.find({});
    return result;
});
// Getting ecospaces for taking appointment - query(serviceId)
const getEcoSpacesByServiceIdFromDB = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!serviceId || serviceId === "null") {
        return yield ecoSpaces_model_1.EcoSpaceModel.find({});
    }
    const result = yield ecoSpaces_model_1.EcoSpaceModel.find({ serviceId });
    if (!result.length) {
        throw new AppError_1.AppError(400, "No EcoSpaces Found");
    }
    return result;
});
exports.EcoSpaceServices = {
    createEcoSpaceIntoDB,
    getSingleEcoSpaceFromDB,
    getRecentEcoSpacesFromDB,
    getEcoSpacesByOwnerIdFromDB,
    getAllEcoSpacesFromDB,
    getEcoSpacesByServiceIdFromDB,
};
