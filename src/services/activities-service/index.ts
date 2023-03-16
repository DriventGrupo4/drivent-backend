import acitvitiesRepository from "@/repositories/activities-repository";

async function getActivities() {
  const activities = await acitvitiesRepository.findActivities();
  return activities;
}

const activitiesService = {
  getActivities
};

export default activitiesService;
