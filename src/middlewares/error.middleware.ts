import { NextFunction, Request, Response } from "express";

export class CustomError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export function errorMiddleware(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { statusCode, message } = err;
  res.json({
    status: "Error",
    statusCode,
    message,
  });
  next();
}
