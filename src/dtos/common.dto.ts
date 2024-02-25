class BaseResponseDto<T> {
  body: T;

  constructor(body: T) {
    this.body = body;
  }

  toResponse() {
    return this.body;
  }
}

export default BaseResponseDto;
