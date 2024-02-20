import express from "express";
import { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import { myDataSource } from "./data-source";
import { errorMiddleware } from "./middlewares/error.middleware";
import userRouter from "./routes/user.router";
import tagRouter from "./routes/tag.router";
import articleRouter from "./routes/article.router";
import categoryRouter from "./routes/category.router";

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
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors(corsOptions));

app.use("/api/v2/users", userRouter);
app.use("/article", articleRouter);
app.use("/api/v2/tags", tagRouter);
app.use("/api/v2/categories", categoryRouter);
app.use(errorMiddleware);

app.listen(process.env.DB_PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${process.env.DB_PORT}`);
});
