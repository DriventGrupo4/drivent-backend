import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listMatriculationsById } from "@/controllers/matriculations-controller";

const matriculationRouter = Router();

matriculationRouter
  .all("/*", authenticateToken)
  .get("/:activityId", listMatriculationsById);
export { matriculationRouter };
