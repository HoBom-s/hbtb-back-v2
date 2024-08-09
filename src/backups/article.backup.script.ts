import { spawn } from "child_process";
import { config } from "dotenv";
import { createWriteStream } from "fs";
import path from "path";

config();

const TODAY = new Date().toISOString().slice(0, 10);

const DB_HOST = process.env.DB_HOST!;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_DB;
const ARTICLE_TABLE = "article";

const BACKUP_PATH = path.join(
  process.cwd(),
  "../",
  `${DB_NAME}_${ARTICLE_TABLE}_backup_${TODAY}.sql`,
);

const writeStream = createWriteStream(BACKUP_PATH);

const dumpCommand = spawn("mysqldump", [
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
