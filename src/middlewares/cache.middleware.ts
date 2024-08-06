import { Request, Response, NextFunction } from "express";
import { redisClient } from "../redis/redis.config";

async function cacheMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const key = `redis_${req.method}_${req.originalUrl}`;

    const cacheData = await redisClient.get(key);

    if (!cacheData) {
      return next();
    }

    return res.json({ data: JSON.parse(cacheData) });
  } catch (error) {
    next(error);
  }
}

export default cacheMiddleware;
