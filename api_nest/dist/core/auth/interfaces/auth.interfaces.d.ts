import { NguoiDung } from '@database/entities/auth/nguoi-dung.entity';
export interface LoginAttemptData {
    failedAttempts: number;
    lastFailedTime: number;
}
export interface LoginResult {
    user?: NguoiDung;
    token?: string;
    requireOtp?: boolean;
    email?: string;
    need_update_password?: boolean;
    requireRecaptcha?: boolean;
    message?: string;
    timeOut?: number;
}
export interface DeviceInfo {
    is_otp_verified: boolean;
    last_active: string;
}
export interface UserDevices {
    [deviceId: string]: DeviceInfo;
}
export interface AuthConfig {
    MAX_FAILED_ATTEMPTS: number;
    LOCK_TIME: number;
    TWO_FACTOR_AUTH: number;
    PASS_VALID_TIME: number;
    OTP_REAUTH_TTL: number;
    CHECK_VALID_PASS: number;
    RECAPTCHA_REQUIRED: number;
}
export interface TokenPayload {
    email: string;
    tai_khoan: string;
    time: number;
}
export interface TokenOptions {
    expiresIn: string | number;
}
