"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const config_1 = require("@nestjs/config");
exports.envConfig = (0, config_1.registerAs)('env', () => ({
    port: parseInt(process.env.PORT, 10) || 8307,
    database: {
        type: 'mysql',
        host: process.env.CORE_DATABASE_HOST || '',
        port: parseInt(process.env.CORE_DATABASE_PORT, 10) || 3306,
        username: process.env.CORE_DATABASE_USER || '',
        password: process.env.CORE_DATABASE_PASS || '',
        database: process.env.CORE_DATABASE_NAME || '',
        autoLoadEntities: true,
        synchronize: process.env.CORE_DATABASE_SYNC || 0,
    },
    mail: {
        transport: {
            host: process.env.CORE_MAIL_HOST || '',
            port: parseInt(process.env.CORE_MAIL_PORT, 10) || 587,
            secure: false,
            auth: {
                user: process.env.CORE_MAIL_USERNAME || '',
                pass: process.env.CORE_MAIL_PASSWORD || '',
            },
            tls: { rejectUnauthorized: false },
            debug: parseInt(process.env.CORE_MAIL_DEBUG, 10) === 1,
        },
        defaults: {
            from: process.env.CORE_MAIL_USERNAME || '',
        },
    },
    system_name: process.env.CORE_SYSTEM_NAME || '',
    system_frontend_url: process.env.CORE_SYSTEM_FRONTEND_URL || '',
    jwt_secret_key: process.env.CORE_JWT_SECRET_KEY,
    jwt_expires_time: process.env.CORE_EXPIRES_TIME,
    re_capcha_secret_key: process.env.CORE_RECAPCHA_SECRET_KEY,
    url_recapcha: process.env.CORE_URL_RECAPCHA,
    otp_secret_key: process.env.CORE_OTP_SECRET_KEY,
    image_token_expires_time: process.env.CORE_IMAGE_TOKEN_EXPIRES_TIME || 60,
    max_attempts_before_recaptcha: process.env.MAX_ATTEMPTS_BEFORE_RECAPTCHA,
}));
//# sourceMappingURL=env.config.js.map