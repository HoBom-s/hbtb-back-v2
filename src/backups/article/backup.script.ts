import { spawn } from "child_process";
import { config } from "dotenv";
import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import { access, constants } from "node:fs/promises";
import path from "path";
import {
  ARTICLE_TABLE,
  BACKUP_DIR,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
} from "../common/constant";

config();

const TODAY = new Date().toISOString().slice(0, 10);

async function ensureBackupDirExists() {
  try {
    await access(BACKUP_DIR, constants.F_OK);
  } catch {
    await mkdir(BACKUP_DIR, { recursive: true });
  }
}

async function createBackupScript() {
  await ensureBackupDirExists();

  const BACKUP_PATH = path.join(
    BACKUP_DIR,
    `${DB_NAME}_${ARTICLE_TABLE}_backup_${TODAY}.sql`,
  );

  const writeStream = createWriteStream(BACKUP_PATH);

  const dumpCommand = spawn("mysqldump", [
    "-h",
    DB_HOST,
    "-u",
    DB_USERNAME,
    `-p${DB_PASSWORD}`,
    DB_NAME,
    ARTICLE_TABLE,
  ]);

  dumpCommand.stdout
    .pipe(writeStream)
    .on("finish", () => console.log("Dump completed."))
    .on("error", (err) => console.log("Dump Error:", err));
}

createBackupScript();
