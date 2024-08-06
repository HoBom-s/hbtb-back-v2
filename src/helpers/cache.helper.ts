import { Request } from "express";
import { redisClient } from "../redis/redis.config";

class CacheHelper {
  constructor() {}

  private EXTIME = 3600; // Redis TTL 1h

  async setCache(req: Request, data: object) {
    const key = `redis_${req.method}_${req.originalUrl}`;

    const stringifiedData = JSON.stringify(data);

    await redisClient.SETEX(key, this.EXTIME, stringifiedData);

    return;
  }

  async delCache(type: string) {
    const keys = await redisClient.KEYS(`redis_GET_/api/v2/${type}*`);

    if (keys.length) {
      await redisClient.DEL(keys);
    }

    return;
  }
}

export default CacheHelper;
