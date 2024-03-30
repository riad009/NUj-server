import { Router } from "express";
import { ProjectController } from "./project.controller";

const router = Router();

router.post("/create", ProjectController.createProject);

export const ProjectRouter = router;
