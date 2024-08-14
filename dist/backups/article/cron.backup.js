"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const node_cron_1 = __importDefault(require("node-cron"));
const backupScriptPath = path_1.default.join(__dirname, "backup.script.js");
// 매주 토요일에서 일요일 넘어가는 자정 실행
const runBackupScript = node_cron_1.default.schedule(
// "0 0 * * 0",
"* * * * *", () => {
    (0, child_process_1.execFile)("node", [backupScriptPath], (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing backup script: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`Backup script stderr: ${stderr}`);
        }
        console.log(`Backup script output: ${stdout}`);
    });
}, {
    scheduled: false,
    timezone: "Asia/Seoul",
});
exports.default = runBackupScript;
