import path from "path";

export const DB_HOST = process.env.DB_HOST!;
export const DB_USERNAME = process.env.DB_USERNAME!;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_DB!;

export const ARTICLE_TABLE = "article";

export const BACKUP_DIR = path.join(process.cwd(), "../backups");
