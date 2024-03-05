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
// getting all the ecospaces for admin
router.get("/all", EcoSpaceControllers.getAllEcoSpaces);

// getting recent ecospace
router.get("/recent-eco-spaces", EcoSpaceControllers.getRecentEcoSpaces);

// !Uploading from EcoSpaceDocuments controller
router.post(
  "/upload-documents",
  validateRequest(
    EcoSpaceDocumentValidations.createEcoSpaceDocumentValidationSchema
  ),
  EcoSpaceDocumentControllers.createEcoSpaceDocument
);

// getting ecospaces by owner ids
router.get("/list/:ownerId", EcoSpaceControllers.getEcoSpacesByOwnerId);

// Getting ecospaces by query (serviceid)
router.get(
  "/eco-space-list/:serviceId",
  EcoSpaceControllers.getEcoSpacesByServiceId
);

// getting single ecospace by id
router.get("/:ecoSpaceId", EcoSpaceControllers.getSingleEcoSpace);

// deleting
router.delete(
  "/delete/eco-space/:ecoSpaceId",
  EcoSpaceControllers.deleteEcoSpace
);

// updating ecospace
router.patch(
  "/update/eco-space/:ecoSpaceId",
  validateRequest(EcoSpaceValidations.updateEcoSpaceValidation),
  EcoSpaceControllers.updateEcoSpace
);

router.post(
  "/invite",
  validateRequest(EcoSpaceValidations.updateEcoSpaceValidation),
  EcoSpaceControllers.inviteEcospace
);
router.patch(
  "/accept-invite",
  validateRequest(EcoSpaceValidations.updateEcoSpaceValidation),
  EcoSpaceControllers.acceptInvite
);

export const EcoSpaceRouter = router;
