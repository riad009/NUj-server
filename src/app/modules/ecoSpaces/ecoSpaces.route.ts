import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { EcoSpaceValidations } from "./ecoSpaces.validation";
import { EcoSpaceControllers } from "./ecoSpaces.controller";

const router = Router();

router.post(
  "/create-eco-space",
  validateRequest(EcoSpaceValidations.createEcoSpaceValidation),
  EcoSpaceControllers.createEcoSpace
);

export const EcoSpaceRouter = router;
