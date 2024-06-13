import { Router } from "express";
import { NotificationController } from "./notification.controller";

const router = Router();

router.get("/create", NotificationController.createNotification);
router.get("/", NotificationController.getNotification);
router.post("/send-mail/", NotificationController.appointmentMail);
router.get("/get/:id", NotificationController.updateNotification);
router.delete("/delete/:id", NotificationController.deleteNotification);

export const NotificationRouter = router;
