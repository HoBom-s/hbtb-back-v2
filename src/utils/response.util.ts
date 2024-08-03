import { Response } from "express";
import BaseResponseDto from "../dtos/common/baseResponse.dto";

function sendResponse<T>(
  res: Response,
  statusCode: number,
  message: string,
  body: T,
): Response {
  const responseDto = new BaseResponseDto(statusCode, message, body);

  return res.status(responseDto.statusCode).json(responseDto.toResponse());
}

export default sendResponse;
