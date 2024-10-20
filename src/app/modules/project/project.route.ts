import { Router } from "express";
import { ProjectController } from "./project.controller";

const router = Router();

router.post("/create", ProjectController.createProject);
router.post("/invite", ProjectController.inviteProject);
router.patch("/accept-invite", ProjectController.acceptInvite);
router.patch("/update/:projectId", ProjectController.updateProject);
router.get("/:ecoSpaceId", ProjectController.getAllProjects);
router.delete("/:projectId", ProjectController.deleteProject);
router.get("/single/:projectId", ProjectController.getSingleProject);

export const ProjectRouter = router;
