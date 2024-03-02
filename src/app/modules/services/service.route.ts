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

router.get("/list", ServiceControllers.getAllServices);

export const ServiceRouter = router;
