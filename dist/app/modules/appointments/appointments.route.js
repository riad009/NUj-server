"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRouter = void 0;
const express_1 = require("express");
const appointments_controller_1 = require("./appointments.controller");
const router = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({});
const upload = (0, multer_1.default)({ storage });
router.post("/create-appointment", 
// validateRequest(AppointmentValidations.createAppointmentValidationSchema),
appointments_controller_1.AppointmentControllers.createAppointment);
// getting recent appointments
router.get("/recent-appointments", appointments_controller_1.AppointmentControllers.getRecentAppointment);
router.get("/list/:ecoSpaceId", appointments_controller_1.AppointmentControllers.getEcoSpaceAppointments);
// single appointment details
router.get("/details/:appointmentId", appointments_controller_1.AppointmentControllers.getSingleAppointment);
// updating appointment status
router.get("/approve/:appointmentId", appointments_controller_1.AppointmentControllers.approveAppointment);
router.get("/mark-as-completed/:appointmentId", appointments_controller_1.AppointmentControllers.completeAppointment);
router.get("/user/appointment/list/:userId", appointments_controller_1.AppointmentControllers.getAppointmentsForSingleUser);
router.patch("/location-image/", upload.single("image"), appointments_controller_1.AppointmentControllers.updateLocationImage);
exports.AppointmentRouter = router;
