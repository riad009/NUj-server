import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { EcoSpaceValidations } from "./ecoSpaces.validation";
import { EcoSpaceControllers } from "./ecoSpaces.controller";
import { EcoSpaceDocumentValidations } from "../EcoSpaceDocuments/EcoSpaceDocuments.validation";
import { EcoSpaceDocumentControllers } from "../EcoSpaceDocuments/EcoSpaceDocuments.controller";

const router = Router();

// creating eco space
router.post(
  "/create-eco-space",
  validateRequest(EcoSpaceValidations.createEcoSpaceValidation),
  EcoSpaceControllers.createEcoSpace
);

// getting single ecospace by id
router.get("/:ecoSpaceId", EcoSpaceControllers.getSingleEcoSpace);

// getting recent ecospace
router.get("/recent-eco-spaces", EcoSpaceControllers.getRecentEcoSpaces);

// getting ecospaces by owner ids
router.get("/list/:ownerId", EcoSpaceControllers.getEcoSpacesByOwnerId);

// getting all the ecospaces for admin
router.get("/all", EcoSpaceControllers.getAllEcoSpaces);

// Getting ecospaces by query (serviceid)
router.get(
  "/eco-space-list/:serviceId",
  EcoSpaceControllers.getEcoSpacesByServiceId
);

// !Uploading from EcoSpaceDocuments controller
router.post(
  "/upload-documents",
  validateRequest(
    EcoSpaceDocumentValidations.createEcoSpaceDocumentValidationSchema
  ),
  EcoSpaceDocumentControllers.createEcoSpaceDocument
);

export const EcoSpaceRouter = router;
