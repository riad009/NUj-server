"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
const channel_controller_1 = require("./channel.controller");
router.get("/:ecoSpaceId", channel_controller_1.ChannelController.getAllChannels);
router.post("/create", channel_controller_1.ChannelController.createChannel);
exports.ChannelRoutes = router;
