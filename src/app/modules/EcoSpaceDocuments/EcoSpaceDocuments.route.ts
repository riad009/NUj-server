import { Router } from "express";
import { EcoSpaceDocumentControllers } from "./EcoSpaceDocuments.controller";
const router = Router();
import multer from "multer";
const storage = multer.diskStorage({});

const upload = multer({ storage });
router.post(
  "/toxicity-detection",
  EcoSpaceDocumentControllers.toxicityDetection
);

router.patch(
  "/upload-files/:id",
  upload.single("file"),
  EcoSpaceDocumentControllers.uploadFiles
);

export const EcoSpaceDocumentRoutes = router;
