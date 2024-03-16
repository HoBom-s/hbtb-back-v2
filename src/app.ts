import express from "express";
import { Express } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import { myDataSource } from "./data-source";
import { errorMiddleware } from "./middlewares/error.middleware";
import userRouter from "./routes/user.router";
import tagRouter from "./routes/tag.router";
import articleRouter from "./routes/article.router";
import categoryRouter from "./routes/category.router";
import swaggerUi from "swagger-ui-express";
import apiSpec from "./swagger/api-spec";
import morganHandler from "./utils/morgan.util";
import { redisConnection } from "./redis/redis.config";

config();

myDataSource
  .initialize()
  .then(() => console.log("DB INITIALIZED"))
  .catch((error) => console.warn(error));

const app: Express = express();
const corsOptions = {
  origin: process.env.CLIENT_HOST,
  credentials: true,
};

redisConnection();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors(corsOptions));

app.use(morganHandler);
app.use("/api/v2/docs", swaggerUi.serve, swaggerUi.setup(apiSpec));
app.use("/api/v2/users", userRouter);
app.use("/api/v2/articles", articleRouter);
app.use("/api/v2/tags", tagRouter);
app.use("/api/v2/categories", categoryRouter);
app.use(errorMiddleware);

app.listen(process.env.DB_PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${process.env.DB_PORT}`);
});
