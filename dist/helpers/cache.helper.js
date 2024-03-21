"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_config_1 = require("../redis/redis.config");
class CacheHelper {
    constructor() {
        this.EXTIME = 3600; // Redis TTL 1h
    }
    setCache(req, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = `redis_${req.method}_${req.originalUrl}`;
            const stringifiedData = JSON.stringify(data);
            yield redis_config_1.redisClient.SETEX(key, this.EXTIME, stringifiedData);
            return;
        });
    }
    delCache(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = yield redis_config_1.redisClient.KEYS(`redis_GET_/api/v2/${type}*`);
            if (keys.length) {
                yield redis_config_1.redisClient.DEL(keys);
            }
            return;
        });
    }
}
exports.default = CacheHelper;
