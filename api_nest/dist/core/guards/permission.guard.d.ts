import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth/auth.service';
export declare class PermissionGuard implements CanActivate {
    private reflector;
    private readonly authService;
    private readonly logger;
    constructor(reflector: Reflector, authService: AuthService);
    canActivate(context: ExecutionContext): boolean;
}
