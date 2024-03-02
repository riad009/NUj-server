"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoSpaceDocumentRoutes = void 0;
const express_1 = require("express");
const EcoSpaceDocuments_controller_1 = require("./EcoSpaceDocuments.controller");
const router = (0, express_1.Router)();
router.post("/toxicity-detection", EcoSpaceDocuments_controller_1.EcoSpaceDocumentControllers.toxicityDetection);
exports.EcoSpaceDocumentRoutes = router;
