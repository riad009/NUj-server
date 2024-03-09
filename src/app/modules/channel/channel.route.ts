import { Router } from "express";

const router = Router();

import { ChannelController } from "./channel.controller";

router.get("/:ecoSpaceId", ChannelController.getAllChannels);
router.post("/create", ChannelController.createChannel);
router.get("/single/:channelId", ChannelController.getSingleChannel);

export const ChannelRoutes = router;
