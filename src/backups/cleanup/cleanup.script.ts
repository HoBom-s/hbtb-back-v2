import { readdir, stat, unlink } from "fs/promises";
import { BACKUP_DIR } from "../common/constant";
import path from "path";

const MAX_AGE_DAYS = 14;

async function removeOldBackups() {
  try {
    const files = await readdir(BACKUP_DIR);

    const removePromises = files.map(async (file) => {
      const filePath = path.join(BACKUP_DIR, file);
      const fileStat = await stat(filePath);

      const now = Date.now();
      const fileBirthTime = fileStat.birthtimeMs || fileStat.ctimeMs;

      const fileAgeInDay = (now - fileBirthTime) / (1000 * 60 * 60 * 24);

      if (fileAgeInDay > MAX_AGE_DAYS) {
        await unlink(filePath);
        console.log("Deleted old backup file:", file);
      }
    });

    await Promise.all(removePromises);
    console.log("Deleted old backup files completed.");
  } catch (error) {
    console.log("Error removing old backups:", error);
  }
}

export default removeOldBackups;
