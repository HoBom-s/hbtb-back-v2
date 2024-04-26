"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./data-source");
const error_middleware_1 = require("./middlewares/error.middleware");
const user_router_1 = __importDefault(require("./routes/user.router"));
const tag_router_1 = __importDefault(require("./routes/tag.router"));
const article_router_1 = __importDefault(require("./routes/article.router"));
const category_router_1 = __importDefault(require("./routes/category.router"));
const health_check_router_1 = __importDefault(require("./routes/health-check.router"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const api_spec_1 = __importDefault(require("./swagger/api-spec"));
const morgan_util_1 = __importDefault(require("./utils/morgan.util"));
const redis_config_1 = require("./redis/redis.config");
(0, dotenv_1.config)();
data_source_1.myDataSource
    .initialize()
    .then(() => console.log("DB INITIALIZED"))
    .catch((error) => console.warn(error));
const app = (0, express_1.default)();
const corsOptions = {
    origin: process.env.CLIENT_HOST,
    credentials: true,
};
(0, redis_config_1.redisConnection)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use(morgan_util_1.default);
app.use("/api/v2/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(api_spec_1.default));
app.use("api/v2/health", health_check_router_1.default);
app.use("/api/v2/users", user_router_1.default);
app.use("/api/v2/articles", article_router_1.default);
app.use("/api/v2/tags", tag_router_1.default);
app.use("/api/v2/categories", category_router_1.default);
app.use(error_middleware_1.errorMiddleware);
const server = app.listen(process.env.DB_PORT, () => {
    if (process.send)
        process.send("ready");
    console.log(`SERVER IS RUNNING ON PORT ${process.env.DB_PORT}`);
});
process.on("SIGINT", () => {
    server.close(() => {
        console.log("SERVER CLOSED");
        process.exit(0);
    });
});
