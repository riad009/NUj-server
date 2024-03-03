import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { AppointmentValidations } from "./appointments.validation";
import { AppointmentControllers } from "./appointments.controller";

const router = Router();

import multer from "multer";
const storage = multer.diskStorage({});

const upload = multer({ storage });

router.post(
  "/create-appointment",
  // validateRequest(AppointmentValidations.createAppointmentValidationSchema),
  AppointmentControllers.createAppointment
);

// getting recent appointments
router.get("/recent-appointments", AppointmentControllers.getRecentAppointment);

router.get("/list/:ecoSpaceId", AppointmentControllers.getEcoSpaceAppointments);

// single appointment details
router.get(
  "/details/:appointmentId",
  AppointmentControllers.getSingleAppointment
);

// updating appointment status
router.get(
  "/approve/:appointmentId",
  AppointmentControllers.approveAppointment
);
router.get(
  "/mark-as-completed/:appointmentId",
  AppointmentControllers.completeAppointment
);

router.get(
  "/user/appointment/list/:userId",
  AppointmentControllers.getAppointmentsForSingleUser
);

router.patch(
  "/location-image/",
  upload.single("image"),
  AppointmentControllers.updateLocationImage
);

export const AppointmentRouter = router;
