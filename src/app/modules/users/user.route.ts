import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";
import { UserControllers } from "./user.controller";

const router = Router();

router.post(
  "/create-user",
  validateRequest(UserValidations.createUserValidation),
  UserControllers.createUser
);

export const UserRouter = router;
