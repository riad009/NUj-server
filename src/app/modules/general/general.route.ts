import { Router } from "express";
import { GeneralControllers } from "./general.controller";

const router = Router();

router.get("/statistics", GeneralControllers.getStatistics);
router.get("/my-profile/:email", GeneralControllers.getMyProfile);

export const GeneralRouter = router;
