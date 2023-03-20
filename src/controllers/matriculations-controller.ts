import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import matriculationService from "@/services/matriculations-service";

export async function listMatriculationsById(req: AuthenticatedRequest, res: Response) {
  try {
    const activityId  = parseInt(req.params.activityId);
    const matriculations = await matriculationService.getMatriculationsByActivity(activityId);
    return res.status(httpStatus.OK).send(matriculations);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
