import { Router } from "express";
import { GeneralControllers } from "./general.controller";

const router = Router();

router.get("/statistics", GeneralControllers.getStatistics);

export const GeneralRouter = router;
