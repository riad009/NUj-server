"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const message_controller_1 = require("./message.controller");
const storage = multer_1.default.diskStorage({});
const upload = (0, multer_1.default)({ storage });
router.get("/:projectId", message_controller_1.MessageController.getAllMessages);
router.get("/email/:email", message_controller_1.MessageController.getAllMessagesEmail);
router.post("/create", upload.array("file"), message_controller_1.MessageController.createMessage);
exports.MessageRoutes = router;
