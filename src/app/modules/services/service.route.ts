import { Router } from "express";
import { ServiceControllers } from "./service.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { ServiceValidations } from "./service.validation";

const router = Router();

router.post(
  "/create-service",
  validateRequest(ServiceValidations.createServiceValidation),
  ServiceControllers.createService
);

export const ServiceRouter = router;
