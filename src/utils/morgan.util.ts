import morgan from "morgan";
import winstonLogger from "./winston.utils";

const morganHandler = morgan("combined", {
  stream: { write: (message) => winstonLogger.info(message.trim()) },
});

export default morganHandler;
