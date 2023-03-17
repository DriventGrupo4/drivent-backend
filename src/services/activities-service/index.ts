import acitvitiesRepository from '@/repositories/activities-repository';
import matriculationRepository from '@/repositories/matriculation-repository';
import { conflictError, notFoundError } from '@/errors';
import dayjs from 'dayjs';

async function getActivities() {
  const activities = await acitvitiesRepository.findActivities();
  return activities;
}
async function postActivities(userId: number, activityId: number) {
  const activity = await acitvitiesRepository.findActivityById(activityId);

  if (!activity) {
    throw notFoundError();
  }
  const matriculationsByUser = await matriculationRepository.findMatriculationsByUserId(userId);
  for (const matriculation of matriculationsByUser) {
    const currentActivity = await acitvitiesRepository.findActivityById(matriculation.activityId);
    if (
      hasConflict(
        activity.startDateTime,
        activity.endDateTime,
        currentActivity.startDateTime,
        currentActivity.endDateTime,
      )
    ) {
      throw conflictError('Você já está inscrito em uma atividade nesse horário!');
    }
  }

  await matriculationRepository.postMatriculation(userId, activityId);

  return;
}

function hasConflict(startDate1: Date, endDate1: Date, startDate2: Date, endDate2: Date) {
  const start1 = dayjs(startDate1);
  const end1 = dayjs(endDate1);
  const start2 = dayjs(startDate2);
  const end2 = dayjs(endDate2);

  return start1.isBefore(end2) && start2.isBefore(end1);
}

const activitiesService = {
  getActivities,
  postActivities,
};

export default activitiesService;
