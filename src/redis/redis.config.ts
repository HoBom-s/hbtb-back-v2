import { createClient } from "redis";
import { config } from "dotenv";

config();

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT!, 10),
  },
});

redisClient.on("error", (error) => console.warn(`REDIS: ${error}`));

function redisConnection() {
  return redisClient.connect();
}

export default redisConnection;
