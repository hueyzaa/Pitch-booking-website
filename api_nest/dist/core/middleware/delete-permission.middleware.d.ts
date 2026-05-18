/// <reference types="cookie-parser" />
import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import { UserReqData } from '../users/interfaces/user-req.interface';
interface RequestWithUser extends Request {
    user?: UserReqData;
}
export declare class DeletePermissionMiddleware implements NestMiddleware {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    use(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
}
export {};
