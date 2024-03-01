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

export const AppointmentRouter = router;
