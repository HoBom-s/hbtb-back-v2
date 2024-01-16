import express from "express";
import { Express } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import userRouter from "./routes/user.router";
import { myDataSource } from "./data-source";
import { errorMiddleware } from "./middlewares/error.middleware";
import articleRouter from "./routes/article.router";
import tagRouter from "./routes/tag.router";

dotenv.config();

myDataSource
  .initialize()
  .then(() => console.log("DB INITIALIZED"))
  .catch((error) => console.warn(error));

const app: Express = express();
const corsOptions = {
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors(corsOptions));

app.use("/user", userRouter);
app.use("/article", articleRouter);
app.use("/tag", tagRouter);
app.use(errorMiddleware);

app.listen(process.env.DB_PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${process.env.DB_PORT}`);
});
