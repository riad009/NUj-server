import { Router } from "express";
import { ProjectController } from "./project.controller";

const router = Router();

router.post("/create", ProjectController.createProject);
router.get("/:ecoSpaceId", ProjectController.getAllProjects);
router.get("/single/:projectId", ProjectController.getSingleProject);

export const ProjectRouter = router;
