import cron from "node-cron";
import removeOldBackups from "./cleanup.script";

// 매주 토요일에서 일요일 넘어가는 자정 실행
const runCleanupScript = cron.schedule(
  "0 0 * * 0",
  async () => {
    await removeOldBackups();
  },
  {
    scheduled: false,
    timezone: "Asia/Seoul",
  },
);

export default runCleanupScript;
