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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoSpaceServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = require("../../errors/AppError");
const user_model_1 = require("../users/user.model");
const ecoSpaces_model_1 = require("./ecoSpaces.model");
const appointments_model_1 = require("../appointments/appointments.model");
const sendEmail_1 = require("../../helper/sendEmail");
const project_model_1 = require("../project/project.model");
// creating ecospace
const createEcoSpaceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_model_1.UserModel.findById(payload === null || payload === void 0 ? void 0 : payload.owner);
    if (!userExist) {
        throw new AppError_1.AppError(400, "User not found");
    }
    if (userExist === null || userExist === void 0 ? void 0 : userExist.isDeleted) {
        throw new AppError_1.AppError(400, "User not found");
    }
    const { projects } = payload, newPayload = __rest(payload, ["projects"]);
    // const result = (await EcoSpaceModel.create(newPayload)).populate(
    //   "owner serviceId plan"
    // );
    const result = yield ecoSpaces_model_1.EcoSpaceModel.create(newPayload);
    if (!result) {
        throw new AppError_1.AppError(400, "Could not create");
    }
    projects === null || projects === void 0 ? void 0 : projects.forEach((project) => __awaiter(void 0, void 0, void 0, function* () {
        const newProjectPayload = {
            ecoSpaceId: result === null || result === void 0 ? void 0 : result._id,
            projectName: project,
            email: result === null || result === void 0 ? void 0 : result.email,
            clients: [],
        };
        const projectResult = yield project_model_1.ProjectModel.create(newProjectPayload);
    }));
    return result;
});
// updating single ecospce details by querying with id
const updateEcoSpaceFromDB = (ecoSpaceId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ecoSpaces_model_1.EcoSpaceModel.findByIdAndUpdate(ecoSpaceId, payload);
    return result;
});
// inserting new project to the ecospace projects array
const addNewProjectToEcoSpaceFromDB = (ecoSpaceId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ecoSpaces_model_1.EcoSpaceModel.findByIdAndUpdate(ecoSpaceId, {
        $push: { projects: payload === null || payload === void 0 ? void 0 : payload.project },
    });
    return result;
});
// Get single ecospace by id
const getSingleEcoSpaceFromDB = (ecoSpaceId) => __awaiter(void 0, void 0, void 0, function* () {
    const ecoSpace = yield ecoSpaces_model_1.EcoSpaceModel.findById(ecoSpaceId).populate("serviceId owner");
    return ecoSpace;
});
// Getting recent ecospace, this will only return limited ecosapce with limited values
const getRecentEcoSpacesFromDB = (limit) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ecoSpaces_model_1.EcoSpaceModel.find({}, { company: 1, project: 1, plan: 1 })
        .sort({ createdAt: -1 })
        .limit(limit);
    return result;
});
// getting list of ecospaces for a single user by _id(owner)
const getEcoSpacesByOwnerIdFromDB = (ownerId, email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ecoSpaces_model_1.EcoSpaceModel.find({
        $or: [{ owner: ownerId }, { staffs: { $in: [email] } }],
    })
        .sort({ createdAt: -1 })
        .populate("serviceId");
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
    const result = yield ecoSpaces_model_1.EcoSpaceModel.find({ serviceId })
        .sort({ createdAt: -1 })
        .populate("serviceId plan");
    if (!result.length) {
        throw new AppError_1.AppError(400, "No EcoSpaces Found");
    }
    return result;
});
// deleteing ecospace by id
const deleteEcoSpaceFromDB = (ecoSpaceId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deleteEcoSpaceResult = yield ecoSpaces_model_1.EcoSpaceModel.findByIdAndDelete(ecoSpaceId, { session });
        if (!deleteEcoSpaceResult) {
            throw new AppError_1.AppError(400, "Could not delete");
        }
        const deleteAppointmentsResult = yield appointments_model_1.AppointmentModel.deleteMany({
            ecoSpaceId,
        }, { session });
        if (!deleteAppointmentsResult) {
            throw new AppError_1.AppError(400, "Could not delete");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deleteEcoSpaceResult;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.AppError(400, "Could not delete");
    }
});
const inviteEcospace = (email, ecoSpaceId, ecoSpaceName) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, sendEmail_1.sendEmail)(email, ecoSpaceId, ecoSpaceName);
    return result;
});
const acceptInvite = (email, ecoSpaceId) => __awaiter(void 0, void 0, void 0, function* () {
    const ecoSpace = yield ecoSpaces_model_1.EcoSpaceModel.findById(ecoSpaceId);
    if (!ecoSpace) {
        throw new Error("Ecospace not found!");
    }
    ecoSpace === null || ecoSpace === void 0 ? void 0 : ecoSpace.staffs.push(email);
    const result = yield (ecoSpace === null || ecoSpace === void 0 ? void 0 : ecoSpace.save());
    return result;
});
exports.EcoSpaceServices = {
    createEcoSpaceIntoDB,
    getSingleEcoSpaceFromDB,
    getRecentEcoSpacesFromDB,
    getEcoSpacesByOwnerIdFromDB,
    getAllEcoSpacesFromDB,
    getEcoSpacesByServiceIdFromDB,
    deleteEcoSpaceFromDB,
    updateEcoSpaceFromDB,
    addNewProjectToEcoSpaceFromDB,
    inviteEcospace,
    acceptInvite,
};
