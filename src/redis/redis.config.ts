import { createClient } from "redis";
import { config } from "dotenv";

config();

export const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT!, 10),
  },
});

redisClient.on("error", (error) => console.warn(`REDIS: ${error}`));

export function redisConnection() {
  return redisClient.connect();
}
