import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";
import { UserControllers } from "./user.controller";

const router = Router();

import multer from "multer";
import auth from "../../middlewares/auth";
const storage = multer.diskStorage({});

const upload = multer({ storage });

// creating user
router.post(
  "/create-user",
  validateRequest(UserValidations.createUserValidation),
  UserControllers.signup
);

router.post("/signin", UserControllers.signin);

router.post("/create-google-user", UserControllers.createGoogleUser);

router.get(
  "/profile",
  auth("user", "admin", "superAdmin"),
  UserControllers.getUserProfile
);

// getting all users
router.get("/all", UserControllers.getAllUsers);

// getting single user by _id
router.get("/:userId", UserControllers.getSingleUser);

// updating user
router.put(
  "/update-user/:userId",

  UserControllers.updateUser
);

// updating isnotify
router.patch("/isnotify/:userId", UserControllers.updateNotify);
router.delete("/delete/:userId", UserControllers.deleteUser);

router.patch(
  "/update-image/:userId",
  upload.single("image"),
  UserControllers.updateImage
);

router.post("/forgot-password", UserControllers.forgotPassword);
router.post("/reset-password", UserControllers.resetPassword);

export const UserRouter = router;
