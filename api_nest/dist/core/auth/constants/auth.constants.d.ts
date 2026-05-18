export declare const AUTH_CACHE_KEYS: {
    readonly LOGIN_TEMP: (username: string) => string;
    readonly USER_DEVICES: (userId: number) => string;
};
export declare const TOKEN_EXPIRY: {
    readonly RESET_PASSWORD: number;
    readonly UPDATE_PASSWORD: number;
};
export declare const AUTH_CONFIG_KEYS: readonly ["MAX_FAILED_ATTEMPTS", "LOCK_TIME", "TWO_FACTOR_AUTH", "PASS_VALID_TIME", "OTP_REAUTH_TTL", "CHECK_VALID_PASS", "RECAPTCHA_REQUIRED"];
