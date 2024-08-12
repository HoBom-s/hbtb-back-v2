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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const dotenv_1 = require("dotenv");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const promises_2 = require("node:fs/promises");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)();
const TODAY = new Date().toISOString().slice(0, 10);
const DB_HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_DB;
const ARTICLE_TABLE = "article";
const BACKUP_DIR = path_1.default.join(process.cwd(), "../backups");
function ensureBackupDirExists() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, promises_2.access)(BACKUP_DIR, promises_2.constants.F_OK);
        }
        catch (_a) {
            yield (0, promises_1.mkdir)(BACKUP_DIR, { recursive: true });
        }
    });
}
function createBackupScript() {
    return __awaiter(this, void 0, void 0, function* () {
        yield ensureBackupDirExists();
        const BACKUP_PATH = path_1.default.join(BACKUP_DIR, `${DB_NAME}_${ARTICLE_TABLE}_backup_${TODAY}.sql`);
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
    });
}
createBackupScript();
