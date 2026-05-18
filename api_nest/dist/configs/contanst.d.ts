export declare const HTTP_CODE: {
    FORBIDDEN: string;
    UNPROCESSABLE_CONTENT: string;
    NOT_FOUND: string;
    UNAUTHORIZED: string;
    INTERNAL_ERROR: string;
    OK: string;
    BAD_REQUEST: string;
};
export declare const DATABASE_GENERAL_ERROR: {
    DUPLICATE_ENTRY: string;
    FOREIGN_KEY: string;
    ER_NO_REFERENCED_ROW_2: string;
    DATA_TOO_LONG: string;
    NOT_NULL: string;
    INVALID_DATETIME: string;
    ER_WARN_DATA_OUT_OF_RANGE: string;
};
export declare const CORE_COMMON_MESSAGE: {
    LOGOUT_SUCCESS: string;
    RESET_PASSWORD_SUCCESS: string;
    FORGOT_PASSWORD_SUCCESS: string;
    CHANGE_PASSWORD_SUCCESS: string;
    DELETE_PASSWORD_SUCCESS: string;
    SET_FIREBASE_TOKEN_SUCCESS: string;
};
export declare const CORE_COMMON_ERROR: {
    RECAPTCHA_REQUIRED: string;
    TOKEN_NOT_FOUND: string;
    MISSING_DEVICE_ID: string;
    MISSING_TOKEN: string;
    INVALID_DEVICE_ID: string;
    DUPLICATE_ENTRY: string;
    UNKNOWN_ERROR: string;
    PERMISSION_DENY: string;
    SAVE_SESSION_FAILED: string;
    NOT_FOUND_OR_INACTIVE: string;
    NOT_CORRECT_CURRENT_PASSWORD: string;
    NOT_FOUND_CURRENT_PASSWORD: string;
    INVALID_TOKEN: string;
    RESET_PASSWORD_SESSION_EXPIRES: string;
    INVALID_USERNAME_OR_PASSWORD: string;
    NOT_DETECT_DEVICE: string;
    ROLE_INVALID: string;
    FOREIGN_KEY_EXCEPTION: string;
    INVALID_EMAIL: string;
    INVALID_TIME_FORMAT: string;
    NOT_WORKING_HOURS: string;
    NOT_FOUND: string;
    INVALID_OTP: string;
    FILE_NOT_FOUND: string;
    DATA_TOO_LONG: string;
    NOT_NULL: string;
    INVALID_DATETIME: string;
    ER_WARN_DATA_OUT_OF_RANGE: string;
    ENOENT: string;
};
export declare const CORE_COMMON_ERROR_CUSTOM: {
    INVALID_LOGIN_ATTEMPTS: (remainingAttempts: number) => string;
    ACCOUNT_LOCKED: (timeOut: number) => string;
};
export declare enum STATUS {
    INACTIVE = 0,
    ACTIVE = 1
}
export declare enum GENDER {
    FEMALE = 0,
    MALE = 1
}
export declare const ROLE: {
    ADMIN: string;
    USER: string;
};
export declare const isAdminRole: string[];
export declare const keyConfig: string[];
export declare const validDay: string[];
export declare const LOAI_FILE: {
    SECRET: string;
    PUBLIC: string;
};
export declare const IS_OTP_VERIFY: {
    NOT_VERIFY: number;
    VERIFY: number;
};
export declare const VALID_PASS: {
    NOT_VALID: number;
    VALID: number;
};
export declare const CONFIG_KEY_AND_DEFAULT_VALUE: {
    MAX_FAILED_ATTEMPTS: {
        key: string;
        defaultValue: string;
    };
    LOCK_TIME: {
        key: string;
        defaultValue: string;
    };
    TWO_FACTOR_AUTH: {
        key: string;
        defaultValue: string;
    };
    PASS_VALID_TIME: {
        key: string;
        defaultValue: string;
    };
    OTP_REAUTH_TTL: {
        key: string;
        defaultValue: string;
    };
    CHECK_VALID_PASS: {
        key: string;
        defaultValue: string;
    };
    RECAPTCHA_REQUIRED: {
        key: string;
        defaultValue: string;
    };
};
export declare const IMPORT_TYPE: {
    NGUOI_DUNG: string;
};
export declare const IMPORT_DESTINATION: {
    RESULT: string;
};
export declare const expectedHeader: string[];
