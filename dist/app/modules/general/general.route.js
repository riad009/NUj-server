"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralRouter = void 0;
const express_1 = require("express");
const general_controller_1 = require("./general.controller");
const router = (0, express_1.Router)();
router.get("/statistics", general_controller_1.GeneralControllers.getStatistics);
router.get("/my-profile/:email", general_controller_1.GeneralControllers.getMyProfile);
exports.GeneralRouter = router;
