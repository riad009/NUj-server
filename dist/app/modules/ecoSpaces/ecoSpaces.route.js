"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoSpaceRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = require("../../middlewares/validateRequest");
const ecoSpaces_validation_1 = require("./ecoSpaces.validation");
const ecoSpaces_controller_1 = require("./ecoSpaces.controller");
const router = (0, express_1.Router)();
// creating eco space
router.post("/create-eco-space", (0, validateRequest_1.validateRequest)(ecoSpaces_validation_1.EcoSpaceValidations.createEcoSpaceValidation), ecoSpaces_controller_1.EcoSpaceControllers.createEcoSpace);
// getting recent ecospace
router.get("/recent-eco-spaces", ecoSpaces_controller_1.EcoSpaceControllers.getRecentEcoSpaces);
// getting ecospaces by owner ids
router.get("/list/:ownerId", ecoSpaces_controller_1.EcoSpaceControllers.getEcoSpacesByOwnerId);
// getting all the ecospaces for admin
router.get("/all", ecoSpaces_controller_1.EcoSpaceControllers.getAllEcoSpaces);
// Getting ecospaces by query (serviceid)
router.get("/list", ecoSpaces_controller_1.EcoSpaceControllers.getEcoSpacesByServiceId);
exports.EcoSpaceRouter = router;
