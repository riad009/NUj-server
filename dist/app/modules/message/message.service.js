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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const config_1 = __importDefault(require("../../config"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const message_model_1 = require("./message.model");
const sendMeetingMail_1 = require("../../helper/sendMeetingMail");
const project_model_1 = require("../project/project.model");
cloudinary_1.default.v2.config({
    cloud_name: config_1.default.cloud_name,
    api_key: config_1.default.api_key,
    api_secret: config_1.default.api_secret,
});
const createMessage = (files, payload, type) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userImage, ecoSpaceId, message, projectId, userEmail } = payload;
    console.log({ payload });
    const uploadedFiles = [];
    for (const file of files) {
        console.log("inside loop");
        const response = yield cloudinary_1.default.v2.uploader.upload(file.path, {
            resource_type: "auto",
        });
        let fileType;
        if (file.mimetype.startsWith("image")) {
            fileType = "image";
        }
        else if (file.mimetype.startsWith("video")) {
            fileType = "video";
        }
        else if (file.mimetype.startsWith("audio")) {
            fileType = "audio";
        }
        else if (file.mimetype.startsWith("application")) {
            fileType = "application";
        }
        else {
            fileType = "other";
        }
        uploadedFiles.push({
            name: fileType,
            url: response.secure_url,
        });
    }
    let messageData = {
        email,
        userImage,
        ecoSpaceId,
        message,
    };
    for (const file of uploadedFiles) {
        if ((file === null || file === void 0 ? void 0 : file.name) === "image") {
            messageData.image = file === null || file === void 0 ? void 0 : file.url;
        }
        else if ((file === null || file === void 0 ? void 0 : file.name) === "audio") {
            messageData.audio = file === null || file === void 0 ? void 0 : file.url;
        }
        else if ((file === null || file === void 0 ? void 0 : file.name) === "video") {
            messageData.video = file === null || file === void 0 ? void 0 : file.url;
        }
        else if ((file === null || file === void 0 ? void 0 : file.name) === "application") {
            messageData.document = file === null || file === void 0 ? void 0 : file.url;
        }
    }
    if (projectId) {
        messageData.projectId = projectId;
    }
    if (userEmail) {
        messageData.userEmail = userEmail;
    }
    const result = yield message_model_1.Message.create(messageData);
    if (type === "meeting") {
        const project = yield project_model_1.ProjectModel.findById(projectId);
        yield (0, sendMeetingMail_1.sendMeetingMail)(project === null || project === void 0 ? void 0 : project.clients, message);
    }
    return result;
});
const getAllMessages = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ projectId });
    const result = yield message_model_1.Message.find({ projectId }).sort({ createdAt: 1 });
    return result;
});
const getAllMessagesEmail = (userEmail, selfEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const messagesForSelfEmail = yield message_model_1.Message.find({
        email: selfEmail,
        userEmail: userEmail,
    });
    const messagesUserEmail = yield message_model_1.Message.find({
        email: userEmail,
        userEmail: selfEmail,
    });
    const filteredMessages = [...messagesForSelfEmail, ...messagesUserEmail];
    filteredMessages.sort(
    // @ts-ignore
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    return filteredMessages;
});
exports.MessageService = {
    createMessage,
    getAllMessages,
    getAllMessagesEmail,
};
