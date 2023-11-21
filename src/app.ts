import express, { Express, Request, Response } from "express";

const app: Express = express();
const PORT = 8085;

app.get("/", (req, res) => {
  res.send("Express + Node.js + TypeScript Server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
