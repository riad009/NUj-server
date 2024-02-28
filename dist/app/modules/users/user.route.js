"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
// creating user
router.post("/create-user", (0, validateRequest_1.validateRequest)(user_validation_1.UserValidations.createUserValidation), user_controller_1.UserControllers.createUser);
// getting all users
router.get("/all", user_controller_1.UserControllers.getAllUsers);
// getting single user by _id
router.get("/:userId", user_controller_1.UserControllers.getSingleUser);
// updating user
router.put("/update-user/:userId", (0, validateRequest_1.validateRequest)(user_validation_1.UserValidations.updateUserValidation), user_controller_1.UserControllers.updateUser);
// updating isnotify
router.patch("/isnotify/:userId", user_controller_1.UserControllers.updateNotify);
exports.UserRouter = router;
