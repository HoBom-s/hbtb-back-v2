"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConnection = exports.redisClient = void 0;
const redis_1 = require("redis");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.redisClient = (0, redis_1.createClient)({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
    },
});
exports.redisClient.on("error", (error) => console.warn(`REDIS: ${error}`));
function redisConnection() {
    return exports.redisClient.connect();
}
exports.redisConnection = redisConnection;
