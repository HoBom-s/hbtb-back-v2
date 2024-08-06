class BaseResponseDto<T> {
  statusCode: number;

  message: string;

  body?: T;

  constructor(statusCode: number, message: string, body?: T) {
    this.statusCode = statusCode;
    this.message = message;

    if (body !== undefined) {
      this.body = body;
    }
  }

  toResponse(): BaseResponseDto<T> {
    return new BaseResponseDto(this.statusCode, this.message, this.body);
  }
}

export default BaseResponseDto;
