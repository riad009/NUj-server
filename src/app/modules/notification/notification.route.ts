import { Router } from "express";
import { NotificationController } from "./notification.controller";

const router = Router();

router.get("/create", NotificationController.createNotification);
router.get("/", NotificationController.getNotification);
router.post("/send-mail/", NotificationController.appointmentMail);
router.patch("/udpate/:email", NotificationController.updateNotification);

export const NotificationRouter = router;
