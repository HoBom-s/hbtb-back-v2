"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKUP_DIR = exports.ARTICLE_TABLE = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_HOST = void 0;
const path_1 = __importDefault(require("path"));
exports.DB_HOST = process.env.DB_HOST;
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_NAME = process.env.DB_DB;
exports.ARTICLE_TABLE = "article";
exports.BACKUP_DIR = path_1.default.join(process.cwd(), "../backups");
