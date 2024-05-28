import { Router } from "express";
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

router.get(
  "/requested-appointments",
  AppointmentControllers.getRequestedAppointments
);

// single appointment details
router.get(
  "/details/:appointmentId",
  AppointmentControllers.getSingleAppointment
);

router.delete("/delete/:id", AppointmentControllers.deleteAppointment);

// updating appointment status
router.get(
  "/approve/:appointmentId",
  AppointmentControllers.approveAppointment
);
router.patch(
  "/update-status/:appointmentId",
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

router.post("/send-mail/", AppointmentControllers.appointmentMail);

export const AppointmentRouter = router;
