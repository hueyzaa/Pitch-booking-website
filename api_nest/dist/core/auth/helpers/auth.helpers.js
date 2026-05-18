"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHelpers = void 0;
const auth_constants_1 = require("../constants/auth.constants");
class AuthHelpers {
    static async getLoginDataFromCache(cacheManager, username) {
        const cacheKey = auth_constants_1.AUTH_CACHE_KEYS.LOGIN_TEMP(username);
        try {
            const cached = await cacheManager.get(cacheKey);
            if (typeof cached === 'string') {
                return JSON.parse(cached);
            }
            return {
                failedAttempts: 0,
                lastFailedTime: 0,
            };
        }
        catch (error) {
            return {
                failedAttempts: 0,
                lastFailedTime: 0,
            };
        }
    }
    static async updateFailedLoginAttempts(cacheManager, username, loginData, ttl) {
        const cacheKey = auth_constants_1.AUTH_CACHE_KEYS.LOGIN_TEMP(username);
        await cacheManager.set(cacheKey, JSON.stringify(loginData), ttl);
    }
    static async resetLoginAttempts(cacheManager, username) {
        const cacheKey = auth_constants_1.AUTH_CACHE_KEYS.LOGIN_TEMP(username);
        await cacheManager.del(cacheKey);
    }
    static async saveDeviceToCache(cacheManager, userId, deviceId, isOtpVerified, expiresIn) {
        const cacheKey = auth_constants_1.AUTH_CACHE_KEYS.USER_DEVICES(userId);
        const existingDevices = await cacheManager
            .get(cacheKey)
            .then((data) => JSON.parse(data || '{}'));
        existingDevices[deviceId] = {
            is_otp_verified: isOtpVerified,
            last_active: new Date().toISOString(),
        };
        await cacheManager.set(cacheKey, JSON.stringify(existingDevices), expiresIn);
    }
    static async checkDeviceInCache(cacheManager, userId, deviceId) {
        var _a;
        const cacheKey = auth_constants_1.AUTH_CACHE_KEYS.USER_DEVICES(userId);
        const existingDevices = await cacheManager
            .get(cacheKey)
            .then((data) => JSON.parse(data || '{}'));
        if (((_a = existingDevices[deviceId]) === null || _a === void 0 ? void 0 : _a.is_otp_verified) === true) {
            return true;
        }
        return false;
    }
    static async generateAccessToken(helperService, user, options) {
        return await helperService.signJWTToken(user, options);
    }
    static async generateResetPasswordToken(jwtService, user) {
        const payload = {
            email: user.email,
            tai_khoan: user.tai_khoan,
            time: Date.now(),
        };
        return await jwtService.signAsync(payload, {
            expiresIn: auth_constants_1.TOKEN_EXPIRY.RESET_PASSWORD,
        });
    }
    static async generateUpdatePasswordToken(jwtService, user) {
        const payload = {
            email: user.email,
            tai_khoan: user.tai_khoan,
            time: Date.now(),
        };
        return await jwtService.signAsync(payload, {
            expiresIn: auth_constants_1.TOKEN_EXPIRY.UPDATE_PASSWORD,
        });
    }
    static async verifyResetPasswordToken(jwtService, token) {
        return await jwtService.verifyAsync(token);
    }
    static sanitizeUserData(user) {
        const sanitized = Object.assign({}, user);
        delete sanitized.mat_khau;
        delete sanitized.reset_pass_token;
        delete sanitized.otp_secret;
        return sanitized;
    }
    static calculateLockTimeRemaining(lockUntil, now) {
        return {
            seconds: lockUntil.diff(now, 'seconds'),
            minutes: lockUntil.diff(now, 'minutes'),
        };
    }
    static generateLockMessage(lockUntil, now) {
        const { seconds, minutes } = this.calculateLockTimeRemaining(lockUntil, now);
        if (minutes < 1) {
            return `Tài khoản của bạn bị khoá. Vui lòng thử lại sau ${seconds} giây`;
        }
        return `Tài khoản của bạn bị khoá. Vui lòng thử lại sau ${minutes} phút`;
    }
}
exports.AuthHelpers = AuthHelpers;
//# sourceMappingURL=auth.helpers.js.map