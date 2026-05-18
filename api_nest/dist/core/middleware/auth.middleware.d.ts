/// <reference types="cookie-parser" />
import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../profile/profile.service';
export declare class AuthMiddleware implements NestMiddleware {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
