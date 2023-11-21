import express from "express";
import { Express, Request, Response } from "express";
import { User } from "./entity/user.entity";
import { myDataSource } from "./data-source.ts";
import dotenv from "dotenv";

dotenv.config();

myDataSource
  .initialize()
  .then(() => console.log("DB INITIALIZED"))
  .catch((error) => console.warn(error));

const app: Express = express();

app.use(express.json());

app.get("/users", async function (req: Request, res: Response) {
  const users = await myDataSource.getRepository(User).find();
  res.json(users);
});

app.listen(process.env.DB_PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${process.env.DB_PORT}`);
});
