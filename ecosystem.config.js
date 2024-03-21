module.exports = {
  apps: [
    {
      name: "hbtb-v2",
      script: "./dist/app.js",
      watch: "true",
      instances: 0,
      exec_mode: "cluster",
      interpreter: "./node_modules/.bin/ts-node",
    },
  ],
};
