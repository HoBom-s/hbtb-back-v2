import { createLogger, format } from "winston";
import winstonDaily from "winston-daily-rotate-file";

const { combine, timestamp, label, printf } = format;

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logDir = __dirname + "/../../logs";
const koreanTime = () =>
  new Date().toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

function dailyOptions(level: string) {
  return {
    level,
    datePattern: "YYYY-MM-DD",
    dirname: logDir + `/${level}`,
    filename: `%DATE%.${level}.log`,
    maxFiles: 30,
    zippedArchive: true,
  };
}

const winstonLogger = createLogger({
  format: combine(
    label({ label: "Hobom-TechBlog" }),
    timestamp({
      format: koreanTime,
    }),
    logFormat,
  ),

  transports: [new winstonDaily(dailyOptions("info"))],
});

export default winstonLogger;
