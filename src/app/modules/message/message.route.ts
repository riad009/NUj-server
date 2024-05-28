import { Router } from "express";

const router = Router();

import multer from "multer";
import { MessageController } from "./message.controller";
const storage = multer.diskStorage({});

const upload = multer({ storage });

router.get("/:projectId", MessageController.getAllMessages);
router.get("/email/:email", MessageController.getAllMessagesEmail);
router.post("/create", upload.array("file"), MessageController.createMessage);

export const MessageRoutes = router;
