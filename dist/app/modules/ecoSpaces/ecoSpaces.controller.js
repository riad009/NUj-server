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
exports.EcoSpaceControllers = void 0;
const catchAsync_1 = require("../../middlewares/catchAsync");
const sendResponse_1 = require("../../middlewares/sendResponse");
const ecoSpaces_service_1 = require("./ecoSpaces.service");
const createEcoSpace = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ecoSpaces_service_1.EcoSpaceServices.createEcoSpaceIntoDB(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "EcoSpace created successfully",
        data: result,
    });
}));
const updateEcoSpace = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ecoSpaceId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.ecoSpaceId;
    const payload = req === null || req === void 0 ? void 0 : req.body;
    const result = yield ecoSpaces_service_1.EcoSpaceServices.updateEcoSpaceFromDB(ecoSpaceId, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "EcoSpace Updated successfully",
        data: result,
    });
}));
const getSingleEcoSpace = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ecoSpaces_service_1.EcoSpaceServices.getSingleEcoSpaceFromDB(req.params.ecoSpaceId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "EcoSpace Found successfully",
        data: result,
    });
}));
const getRecentEcoSpaces = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit);
    const result = yield ecoSpaces_service_1.EcoSpaceServices.getRecentEcoSpacesFromDB(limit || 5);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Recent EcoSpaces retrieved successfully",
        data: result,
    });
}));
const getEcoSpacesByOwnerId = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ownerId = req.params.ownerId;
    const result = yield ecoSpaces_service_1.EcoSpaceServices.getEcoSpacesByOwnerIdFromDB(ownerId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "EcoSpaces retrieved successfully",
        data: result,
    });
}));
const getAllEcoSpaces = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ecoSpaces_service_1.EcoSpaceServices.getAllEcoSpacesFromDB();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "EcoSpaces retrieved successfully",
        data: result,
    });
}));
const getEcoSpacesByServiceId = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const serviceId = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.serviceId;
    const result = yield ecoSpaces_service_1.EcoSpaceServices.getEcoSpacesByServiceIdFromDB(serviceId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "EcoSpaces retrieved successfully",
        data: result,
    });
}));
const deleteEcoSpace = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const ecoSpaceId = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.ecoSpaceId;
    const result = yield ecoSpaces_service_1.EcoSpaceServices.deleteEcoSpaceFromDB(ecoSpaceId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "EcoSpace deleted successfully",
        data: result,
    });
}));
exports.EcoSpaceControllers = {
    createEcoSpace,
    getSingleEcoSpace,
    getRecentEcoSpaces,
    getEcoSpacesByOwnerId,
    getAllEcoSpaces,
    getEcoSpacesByServiceId,
    deleteEcoSpace,
    updateEcoSpace,
};
