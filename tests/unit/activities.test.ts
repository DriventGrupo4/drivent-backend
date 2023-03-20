import { conflictError } from "@/errors/conflict-error";
import acitvitiesRepository from "@/repositories/activities-repository";
import matriculationRepository from "@/repositories/matriculation-repository";
import activitiesService from "@/services/activities-service";

describe('Service Activities', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getActivities", () => {

        it("should responde with an activity", async () => {

            jest.spyOn(acitvitiesRepository, 'findActivities').mockImplementationOnce((): any => {
                return {
                    id: 1,
                    name: "Interfaces e Aplicações Front-end",
                    capacity: 10,
                    locationId: 1,
                    startDateTime: "2023-03-27T08:00:00.000Z",
                    endDateTime: "2023-03-27T10:00:00.000Z"
                }
            })

            const activity = await activitiesService.getActivities()

            expect(activity).toEqual({
                id: 1,
                name: "Interfaces e Aplicações Front-end",
                capacity: 10,
                locationId: 1,
                startDateTime: "2023-03-27T08:00:00.000Z",
                endDateTime: "2023-03-27T10:00:00.000Z"
            })
        })
    })

    describe('postActivities', () => {

        it('should post matriculation', async () => {
            const userId = 1;
            const activityId = 2;
            const activity = {
                id: 2,
                name: 'Single Page Applications',
                capacity: 10,
                locationId: 1,
                startDateTime: new Date(),
                endDateTime: new Date()
              };
            const matriculationsByUser = [{ id: 1, 
                userId: 1, 
                activityId: 3, 
                startDateTime: new Date(), 
                endDateTime: new Date(), 
                createdAt: new Date() }];
            jest.spyOn(acitvitiesRepository, 'findActivityById').mockResolvedValue(activity);
            jest.spyOn(matriculationRepository, 'findMatriculationsByUserId').mockResolvedValue(matriculationsByUser);
            jest.spyOn(matriculationRepository, 'postMatriculation').mockResolvedValue(undefined);

            await expect(activitiesService.postActivities(userId, activityId)).resolves.toBeUndefined();

            expect(acitvitiesRepository.findActivityById).toHaveBeenCalledWith(activityId);
            expect(matriculationRepository.findMatriculationsByUserId).toHaveBeenCalledWith(userId);
            expect(matriculationRepository.postMatriculation).toHaveBeenCalledWith(userId, activityId);
        });
    })
})

