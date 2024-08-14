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
const promises_1 = require("fs/promises");
const constant_1 = require("../common/constant");
const path_1 = __importDefault(require("path"));
// const MAX_AGE_DAYS = 14;
const MAX_AGE_DAYS = 1;
function removeOldBackups() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield (0, promises_1.readdir)(constant_1.BACKUP_DIR);
            files.map((file) => __awaiter(this, void 0, void 0, function* () {
                const filePath = path_1.default.join(constant_1.BACKUP_DIR, file);
                const fileStat = yield (0, promises_1.stat)(filePath);
                const now = Date.now();
                const fileBirthTime = fileStat.birthtimeMs || fileStat.ctimeMs;
                const fileAgeInDay = (now - fileBirthTime) / (1000 * 60 * 60 * 24);
                if (fileAgeInDay > MAX_AGE_DAYS) {
                    yield (0, promises_1.unlink)(filePath);
                    console.log("Deleted old backup file:", file);
                }
            }));
        }
        catch (error) {
            console.log("Error removing old backups:", error);
        }
    });
}
exports.default = removeOldBackups;
