"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const axiosInstance = axios_1.default.create({
    baseURL: process.env.IMAGE_HOST,
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
});
exports.default = axiosInstance;
