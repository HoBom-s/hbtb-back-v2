"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const backupScriptPath = path_1.default.join(__dirname, "article.backup.script.js");
function runBackupScript() {
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
}
exports.default = runBackupScript;
