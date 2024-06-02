"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
const meeting_controller_1 = require("./meeting.controller");
router.post("/create", meeting_controller_1.MeetingController.createMeeting);
exports.MeetingRoutes = router;
