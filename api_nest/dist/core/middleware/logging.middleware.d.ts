/// <reference types="cookie-parser" />
import { AuthService } from '@core/auth/auth.service';
import { Log } from '@database/entities/system/log.entity';
import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
export declare class LoggerMiddleware implements NestMiddleware {
    private readonly authService;
    private readonly logRepo;
    private readonly loggingConfig;
    constructor(authService: AuthService, logRepo: Repository<Log>);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
    getResponseLog: (res: Response, logId: any) => Promise<any>;
}
