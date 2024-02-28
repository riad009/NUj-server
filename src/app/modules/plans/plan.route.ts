import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { PlanValidations } from "./plan.validation";
import { PlanControllers } from "./plan.controller";

const router = Router();

router.post(
  "/create-plan",
  validateRequest(PlanValidations.createPlanValidation),
  PlanControllers.createPlan
);

router.get("/all", PlanControllers.getAllPlan);

export const PlanRouter = router;
