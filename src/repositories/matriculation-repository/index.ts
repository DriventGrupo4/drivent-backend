import { prisma } from '@/config';

async function findMatriculationsByUserId(userId: number) {
  return prisma.matriculation.findMany({
    where: {
      userId,
    },
  });
}
async function postMatriculation(userId: number, activityId: number) {
  return prisma.matriculation.create({
    data: {
      userId,
      activityId,
    },
  });
}

async function findByActivityId(activityId: number) {
  return prisma.matriculation.findMany({
    where: {
      activityId
    }
  });
}

const matriculationRepository = {
  findMatriculationsByUserId,
  postMatriculation,
  findByActivityId
};

export default matriculationRepository;
