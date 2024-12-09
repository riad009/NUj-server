"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoSpaceRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = require("../../middlewares/validateRequest");
const ecoSpaces_validation_1 = require("./ecoSpaces.validation");
const ecoSpaces_controller_1 = require("./ecoSpaces.controller");
const EcoSpaceDocuments_controller_1 = require("../EcoSpaceDocuments/EcoSpaceDocuments.controller");
const router = (0, express_1.Router)();
// creating eco space
router.post('/create-eco-space', (0, validateRequest_1.validateRequest)(ecoSpaces_validation_1.EcoSpaceValidations.createEcoSpaceValidation), ecoSpaces_controller_1.EcoSpaceControllers.createEcoSpace);
// getting all the ecospaces for admin
router.get('/all', ecoSpaces_controller_1.EcoSpaceControllers.getAllEcoSpaces);
// getting recent ecospace
router.get('/recent-eco-spaces', ecoSpaces_controller_1.EcoSpaceControllers.getRecentEcoSpaces);
// !Uploading from EcoSpaceDocuments controller
router.post('/upload-documents', EcoSpaceDocuments_controller_1.EcoSpaceDocumentControllers.createEcoSpaceDocument);
// getting ecospaces by owner ids
router.get('/list', ecoSpaces_controller_1.EcoSpaceControllers.getEcoSpacesByOwnerId);
// Getting ecospaces by query (serviceid)
router.get('/eco-space-list/:serviceId', ecoSpaces_controller_1.EcoSpaceControllers.getEcoSpacesByServiceId);
// getting single ecospace by id
router.get('/:ecoSpaceId', ecoSpaces_controller_1.EcoSpaceControllers.getSingleEcoSpace);
// deleting
router.delete('/delete/eco-space/:ecoSpaceId', ecoSpaces_controller_1.EcoSpaceControllers.deleteEcoSpace);
// updating ecospace
router.patch('/update/eco-space/:ecoSpaceId', (0, validateRequest_1.validateRequest)(ecoSpaces_validation_1.EcoSpaceValidations.updateEcoSpaceValidation), ecoSpaces_controller_1.EcoSpaceControllers.updateEcoSpace);
router.patch('/delete/co-worker/:ecoSpaceId', ecoSpaces_controller_1.EcoSpaceControllers.deleteCoWorker);
router.patch('/add-project/eco-space/:ecoSpaceId', ecoSpaces_controller_1.EcoSpaceControllers.addNewProjectToEcoSpace);
router.post('/invite', ecoSpaces_controller_1.EcoSpaceControllers.inviteEcospace);
router.patch('/accept-invite', ecoSpaces_controller_1.EcoSpaceControllers.acceptInvite);
exports.EcoSpaceRouter = router;
