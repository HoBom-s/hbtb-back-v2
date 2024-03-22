module.exports = {
  apps: [
    {
      name: "hbtb-v2",
      script: "./dist/app.js",
      // watch: true,
      // ignore_watch: ["node_modules", "logs", "dist"],
      // wait_ready: true,
      // listen_timeout: 5000,
      // kill_timeout: 3000,
      // exec_mode: "cluster",
      // instances: 0,
    },
  ],
};
