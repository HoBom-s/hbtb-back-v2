import path from "path";
import { execFile } from "child_process";

const backupScriptPath = path.join(__dirname, "article.backup.js");

function runBackupScript() {
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
}

export default runBackupScript;
