import { AuthenticatedRequest } from "@/middlewares";
import activitiesService from "@/services/activities-service";
import { Response } from "express";
import { OK } from "http-status";

export async function getActivities(req: AuthenticatedRequest, res: Response ) {
  try{
    const activities = await activitiesService.getActivities();
    return res.status(OK).send(activities);
  }catch(err) {
    console.log(err);
  }
}

