import { Router } from "express";
import { EcoSpaceDocumentControllers } from "./EcoSpaceDocuments.controller";
const router = Router();

router.post(
  "/toxicity-detection",
  EcoSpaceDocumentControllers.toxicityDetection
);

export const EcoSpaceDocumentRoutes = router;
