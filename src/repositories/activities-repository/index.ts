import { prisma } from '@/config';

async function findActivities() {
  return prisma.activity.findMany();
}

async function findActivityById(id: number) {
  return prisma.activity.findFirst({
    where: {
      id
    },
  });
}

const acitvitiesRepository = {
  findActivities,
  findActivityById
};

export default acitvitiesRepository;
