import { Router } from "express";
import { ChannelController } from "./channel.controller";

const router = Router();

router.get("/:ecoSpaceId", ChannelController.getAllChannels);
router.post("/create", ChannelController.createChannel);
router.get("/single/:channelId", ChannelController.getSingleChannel);

export const ChannelRoutes = router;
