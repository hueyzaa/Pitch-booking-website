/// <reference types="cookie-parser" />
import { AuthService } from '@core/auth/auth.service';
import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
export declare class CheckTokenAndDeviceIdFromParamsMiddleware implements NestMiddleware {
    private readonly authService;
    constructor(authService: AuthService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
