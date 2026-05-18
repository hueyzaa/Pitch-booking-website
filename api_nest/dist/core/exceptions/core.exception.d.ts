import { HttpException } from '@nestjs/common';
export declare class HttpCoreException extends HttpException {
    constructor(message: string, errorCode?: string);
}
