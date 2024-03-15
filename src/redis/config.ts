import { createClient } from "redis";
import { config } from "dotenv";

config();

const redisClient = createClient({
  url: `redis://localhost:${process.env.REDIS_PORT}`,
});

redisClient.on("error", (error) => console.warn(`REDIS: ${error}`));

function redisConnection() {
  return redisClient.connect();
}

export default redisConnection;
