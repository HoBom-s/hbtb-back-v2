import { DataSource } from "typeorm";
import { config } from "dotenv";

config();

export const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  entities: ["./dist/**/*.entity.js"],
  charset: "utf8mb4",
  logging: true,
  synchronize: false,
});
