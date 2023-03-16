import { prisma } from "@/config";

async function findActivities() {
  return prisma.activity.findMany();
}

const acitvitiesRepository = {
  findActivities
};

export default acitvitiesRepository;
