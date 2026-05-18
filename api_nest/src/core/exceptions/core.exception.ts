import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpCoreException extends HttpException {
  constructor(message: string, errorCode?: string) {
    super(`${message}||${errorCode}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
