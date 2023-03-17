import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getActivities, postActivities } from "@/controllers/activities-controllers";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/", getActivities)
  .post("/:activityId", postActivities);

export { activitiesRouter };

