import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { HelperService } from '@helper/helper.service';
import { NguoiDung } from '@database/entities/auth/nguoi-dung.entity';
import { LoginAttemptData, TokenPayload, TokenOptions } from '../interfaces/auth.interfaces';
export declare class AuthHelpers {
    static getLoginDataFromCache(cacheManager: Cache, username: string): Promise<LoginAttemptData>;
    static updateFailedLoginAttempts(cacheManager: Cache, username: string, loginData: LoginAttemptData, ttl: number): Promise<void>;
    static resetLoginAttempts(cacheManager: Cache, username: string): Promise<void>;
    static saveDeviceToCache(cacheManager: Cache, userId: number, deviceId: string, isOtpVerified: boolean, expiresIn: number): Promise<void>;
    static checkDeviceInCache(cacheManager: Cache, userId: number, deviceId: string): Promise<boolean>;
    static generateAccessToken(helperService: HelperService, user: NguoiDung, options: TokenOptions): Promise<string>;
    static generateResetPasswordToken(jwtService: JwtService, user: NguoiDung): Promise<string>;
    static generateUpdatePasswordToken(jwtService: JwtService, user: NguoiDung): Promise<string>;
    static verifyResetPasswordToken(jwtService: JwtService, token: string): Promise<TokenPayload>;
    static sanitizeUserData(user: NguoiDung): NguoiDung;
    static calculateLockTimeRemaining(lockUntil: moment.Moment, now: moment.Moment): {
        seconds: number;
        minutes: number;
    };
    static generateLockMessage(lockUntil: moment.Moment, now: moment.Moment): string;
}
