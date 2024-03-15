import { createClient } from "redis";

const redisClient = createClient();
redisClient.on("error", (error) => console.warn(`REDIS ERROR: ${error}`));

function redisConnection() {
  return redisClient.connect();
}

export default redisConnection;
