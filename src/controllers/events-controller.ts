import eventsService from "@/services/events-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { redis } from '@/config/redis'

export async function getDefaultEvent(_req: Request, res: Response) {

  try {
    
    const cachedEvent = await redis.get('event')

    if (cachedEvent) {

      res.status(200).send(JSON.parse(cachedEvent)) 

    }else{

      const event = await eventsService.getFirstEvent();

      redis.setEx('event', 3600, JSON.stringify(event))

      return res.status(httpStatus.OK).send(event);
    }
    
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
