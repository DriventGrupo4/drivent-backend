import { AuthenticatedRequest } from '@/middlewares';
import activitiesService from '@/services/activities-service';
import { Response } from 'express';
import { CREATED, OK } from 'http-status';
import httpStatus from 'http-status';

export async function getActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const activities = await activitiesService.getActivities();
    return res.status(OK).send(activities);
  } catch (err) {
    console.log(err);
  }
}

export async function postActivities(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { activityId } = req.params;
  try {
    await activitiesService.postActivities(+userId, Number(activityId));
    return res.sendStatus(CREATED);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'ConflictError') {
      return res.sendStatus(httpStatus.CONFLICT);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
