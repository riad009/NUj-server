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
exports.EcoSpaceDocumentControllers = void 0;
const catchAsync_1 = require("../../middlewares/catchAsync");
const sendResponse_1 = require("../../middlewares/sendResponse");
const EcoSpaceDocuments_service_1 = require("./EcoSpaceDocuments.service");
// !Uploading through EcoSpace Routes
const createEcoSpaceDocument = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req === null || req === void 0 ? void 0 : req.body;
    const result = yield EcoSpaceDocuments_service_1.EcoSpaceDocumentServices.createEcoSpaceDocumentIntoDB(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Documents Uploaded Successfully",
        data: result,
    });
}));
const toxicityDetection = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req === null || req === void 0 ? void 0 : req.body;
    const result = yield EcoSpaceDocuments_service_1.EcoSpaceDocumentServices.toxicityDetection(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Generated",
        data: result,
    });
}));
exports.EcoSpaceDocumentControllers = {
    toxicityDetection,
    createEcoSpaceDocument,
};
