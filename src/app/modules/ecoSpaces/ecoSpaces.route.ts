import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { EcoSpaceValidations } from "./ecoSpaces.validation";
import { EcoSpaceControllers } from "./ecoSpaces.controller";

const router = Router();

// creating eco space
router.post(
  "/create-eco-space",
  validateRequest(EcoSpaceValidations.createEcoSpaceValidation),
  EcoSpaceControllers.createEcoSpace
);

// getting recent ecospace
router.get("/recent-eco-spaces", EcoSpaceControllers.getRecentEcoSpaces);

// getting ecospaces by owner ids
router.get("/list/:ownerId", EcoSpaceControllers.getEcoSpacesByOwnerId);

// getting all the ecospaces for admin
router.get("/all", EcoSpaceControllers.getAllEcoSpaces);

export const EcoSpaceRouter = router;
