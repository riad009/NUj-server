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
exports.ProjectController = void 0;
const catchAsync_1 = require("../../middlewares/catchAsync");
const sendResponse_1 = require("../../middlewares/sendResponse");
const project_service_1 = require("./project.service");
const createProject = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield req.body;
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Created Successfully",
        data: result,
    });
}));
const getAllProjects = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ecoSpaceId = req.params.ecoSpaceId;
    const result = yield project_service_1.ProjectService.getAllProjectsFromDB(ecoSpaceId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "retrieved successfully",
        data: result,
    });
}));
const getSingleProject = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.projectId;
    const result = yield project_service_1.ProjectService.getSingleProjectFromDB(projectId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "retrieved successfully",
        data: result,
    });
}));
exports.ProjectController = {
    createProject,
    getAllProjects,
    getSingleProject,
};
