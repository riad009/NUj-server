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
exports.MessageController = void 0;
const catchAsync_1 = require("../../middlewares/catchAsync");
const sendResponse_1 = require("../../middlewares/sendResponse");
const message_service_1 = require("./message.service");
const createMessage = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.files, req.body);
    const result = yield message_service_1.MessageService.createMessage(req.files, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Message sent Successfully",
        data: result,
    });
}));
const getAllMessages = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.projectId;
    const result = yield message_service_1.MessageService.getAllMessages(projectId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: "Messages retrieved successfully",
        data: result,
    });
}));
exports.MessageController = {
    createMessage,
    getAllMessages,
};
