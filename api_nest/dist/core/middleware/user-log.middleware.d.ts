/// <reference types="cookie-parser" />
import { LogThaoTacService } from '../../log-thao-tac/log-thao-tac.service';
import { AuthService } from '@core/auth/auth.service';
import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
export declare class UserLogMiddleware implements NestMiddleware {
    private readonly authService;
    private readonly logThaoTacService;
    private readonly loggingConfig;
    constructor(authService: AuthService, logThaoTacService: LogThaoTacService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
