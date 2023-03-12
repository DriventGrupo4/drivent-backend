import { createClient } from "redis";
import dotenv from 'dotenv'
dotenv.config()

export const redis = createClient({
    url: process.env.REDIS_URL
});

redis.connect()

redis.on('connect', () => {
    console.log('Connected to Redis server');
});

redis.on('error', (err) => {
    console.error('Redis error:', err);
});