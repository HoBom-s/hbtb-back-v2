class BaseResponseDto<T> {
  statusCode: number;

  message: string;

  data?: T;

  constructor(statusCode: number, message: string, data?: T) {
    this.statusCode = statusCode;
    this.message = message;

    if (data !== undefined) {
      this.data = data;
    }
  }

  toResponse(): BaseResponseDto<T> {
    return new BaseResponseDto(this.statusCode, this.message, this.data);
  }
}

export default BaseResponseDto;
