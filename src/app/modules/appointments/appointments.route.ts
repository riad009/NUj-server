import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { AppointmentValidations } from "./appointments.validation";
import { AppointmentControllers } from "./appointments.controller";

const router = Router();

router.post(
  "/create-appointment",
  validateRequest(AppointmentValidations.createAppointmentValidationSchema),
  AppointmentControllers.createAppointment
);

// getting recent appointments
router.get("/recent-appointments", AppointmentControllers.getRecentAppointment);

export const AppointmentRouter = router;
