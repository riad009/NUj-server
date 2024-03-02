"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoSpaceDocumentRoutes = void 0;
const express_1 = require("express");
const EcoSpaceDocuments_controller_1 = require("./EcoSpaceDocuments.controller");
const router = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({});
const upload = (0, multer_1.default)({ storage });
router.post("/toxicity-detection", EcoSpaceDocuments_controller_1.EcoSpaceDocumentControllers.toxicityDetection);
router.post("/upload-files/:id", upload.single("file"), EcoSpaceDocuments_controller_1.EcoSpaceDocumentControllers.uploadFiles);
exports.EcoSpaceDocumentRoutes = router;
