"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_CONFIG_KEYS = exports.TOKEN_EXPIRY = exports.AUTH_CACHE_KEYS = void 0;
exports.AUTH_CACHE_KEYS = {
    LOGIN_TEMP: (username) => `loginTemp:${username}`,
    USER_DEVICES: (userId) => `user_devices:${userId}`,
};
exports.TOKEN_EXPIRY = {
    RESET_PASSWORD: 60 * 3,
    UPDATE_PASSWORD: 60 * 60 * 24,
};
exports.AUTH_CONFIG_KEYS = [
    'MAX_FAILED_ATTEMPTS',
    'LOCK_TIME',
    'TWO_FACTOR_AUTH',
    'PASS_VALID_TIME',
    'OTP_REAUTH_TTL',
    'CHECK_VALID_PASS',
    'RECAPTCHA_REQUIRED',
];
//# sourceMappingURL=auth.constants.js.map