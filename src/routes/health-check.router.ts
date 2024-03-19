import { Request, Response, Router } from "express";

const healthRouter = Router();

healthRouter.get("/", (req: Request, res: Response) => {
  return res.json({
    status: 200,
    message: "OK",
  });
});

export default healthRouter;
