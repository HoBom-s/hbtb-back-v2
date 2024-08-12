"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const dotenv_1 = require("dotenv");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)();
// const TODAY = new Date().toISOString().slice(0, 10);
const TODAY = new Date().toISOString();
const DB_HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_DB;
const ARTICLE_TABLE = "article";
const BACKUP_PATH = path_1.default.join(process.cwd(), "../", `${DB_NAME}_${ARTICLE_TABLE}_backup_${TODAY}.sql`);
const writeStream = (0, fs_1.createWriteStream)(BACKUP_PATH);
const dumpCommand = (0, child_process_1.spawn)("mysqldump", [
    "-h",
    DB_HOST,
    "-u",
    `${DB_USERNAME}`,
    `-p${DB_PASSWORD}`,
    `${DB_NAME}`,
    ARTICLE_TABLE,
]);
dumpCommand.stdout
    .pipe(writeStream)
    .on("finish", () => console.log("Dump completed."))
    .on("error", (err) => console.log("Dump Error:", err));
