import path from "path";
import { execFile } from "child_process";
import cron from "node-cron";

const backupScriptPath = path.join(__dirname, "backup.script.js");

// 매주 토요일에서 일요일 넘어가는 자정 실행
const runBackupScript = cron.schedule(
  "0 0 * * 0",
  () => {
    execFile("node", [backupScriptPath], (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing backup script: ${error}`);
        return;
      }
      if (stderr) {
        console.error(`Backup script stderr: ${stderr}`);
      }
      console.log(`Backup script output: ${stdout}`);
    });
  },
  {
    scheduled: false,
    timezone: "Asia/Seoul",
  },
);

export default runBackupScript;
