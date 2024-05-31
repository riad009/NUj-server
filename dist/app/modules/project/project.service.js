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
exports.ProjectService = void 0;
const AppError_1 = require("../../errors/AppError");
const sendEmail_1 = require("../../helper/sendEmail");
const project_model_1 = require("./project.model");
const createProjectIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.ProjectModel.create(payload);
    return result;
});
const getAllProjectsFromDB = (ecoSpaceId, email, role, isCoWorker, isOwner) => __awaiter(void 0, void 0, void 0, function* () {
    let query = { ecoSpaceId };
    const userrole = "user" || "admin";
    if (email &&
        userrole &&
        isCoWorker === "false" &&
        isOwner === "false" &&
        role !== "superAdmin") {
        query = Object.assign(Object.assign({}, query), { clients: email });
    }
    console.log({ query });
    const result = yield project_model_1.ProjectModel.find(query).sort({ createdAt: 1 });
    return result;
});
const getSingleProjectFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.ProjectModel.findById(id);
    return result;
});
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.ProjectModel.findByIdAndDelete(id);
    return result;
});
const inviteProject = (email, projectId, projectName, type) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const project = yield project_model_1.ProjectModel.findById(projectId);
    if ((_a = project === null || project === void 0 ? void 0 : project.clients) === null || _a === void 0 ? void 0 : _a.includes(email)) {
        throw new AppError_1.AppError(400, "Client already exists!");
    }
    const result = yield (0, sendEmail_1.sendEmail)(email, projectId, projectName, type);
    return result;
});
const acceptInvite = (email, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ email, projectId });
    const project = yield project_model_1.ProjectModel.findById(projectId);
    if (!project) {
        throw new AppError_1.AppError(400, "Ecospace not found!");
    }
    project === null || project === void 0 ? void 0 : project.clients.push(email);
    const result = yield (project === null || project === void 0 ? void 0 : project.save());
    return result;
});
exports.ProjectService = {
    createProjectIntoDB,
    getAllProjectsFromDB,
    getSingleProjectFromDB,
    inviteProject,
    acceptInvite,
    deleteProject,
};
