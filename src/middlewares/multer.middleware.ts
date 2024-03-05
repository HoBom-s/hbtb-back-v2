// WIP
import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import multer from "multer";

const upload = multer().any();

function multerMiddleware(req: Request, res: Response, next: NextFunction) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log("1111111", err);
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log("222222", err);
    }

    // Everything went fine.
  });
  next();
}

export default multerMiddleware;
