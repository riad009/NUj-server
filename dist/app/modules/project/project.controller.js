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
    const result = yield project_service_1.ProjectService.createProjectIntoDB(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Created Successfully",
        data: result,
    });
}));
const getAllProjects = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ecoSpaceId = req.params.ecoSpaceId;
    const email = req.query.email;
    const role = req.query.role;
    const isCoWorker = req.query.isCoWorker;
    const result = yield project_service_1.ProjectService.getAllProjectsFromDB(ecoSpaceId, email, role, isCoWorker);
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
const deleteProject = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.projectId;
    const result = yield project_service_1.ProjectService.deleteProject(projectId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "retrieved successfully",
        data: result,
    });
}));
const inviteProject = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, projectId, projectName, type } = req === null || req === void 0 ? void 0 : req.body;
    console.log("req?.body", req === null || req === void 0 ? void 0 : req.body);
    const result = yield project_service_1.ProjectService.inviteProject(email, projectId, projectName, type);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Invited successfully",
        data: result,
    });
}));
const acceptInvite = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, projectId } = req === null || req === void 0 ? void 0 : req.body;
    const result = yield project_service_1.ProjectService.acceptInvite(email, projectId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Invite accepted successfully",
        data: result,
    });
}));
exports.ProjectController = {
    createProject,
    getAllProjects,
    getSingleProject,
    acceptInvite,
    inviteProject,
    deleteProject,
};
