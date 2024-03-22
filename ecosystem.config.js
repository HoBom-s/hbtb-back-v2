module.exports = {
  apps: [
    {
      name: "hbtb-v2",
      script: "dist/app.js",
      // watch: true,
      // ignore_watch: ["node_modules", "logs", "dist"],
      // exec_mode: "cluster",
      // instances: 0,
      wait_ready: true,
      listen_timeout: 5000,
      kill_timeout: 3000,
    },
  ],
};
