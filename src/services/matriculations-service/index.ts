import { notFoundError } from "@/errors";
import matriculationRepository from "@/repositories/matriculation-repository";

async function getMatriculationsByActivity(activityId: number) {
  const matriculations = await matriculationRepository.findByActivityId(activityId);
  if(!matriculations) {
    throw notFoundError();
  }
  return matriculations;
}

const matriculationService = {
  getMatriculationsByActivity,
};

export default matriculationService;
