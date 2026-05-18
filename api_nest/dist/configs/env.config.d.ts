export declare const envConfig: (() => {
    port: number;
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        autoLoadEntities: boolean;
        synchronize: string | number;
    };
    mail: {
        transport: {
            host: string;
            port: number;
            secure: boolean;
            auth: {
                user: string;
                pass: string;
            };
            tls: {
                rejectUnauthorized: boolean;
            };
            debug: boolean;
        };
        defaults: {
            from: string;
        };
    };
    system_name: string;
    system_frontend_url: string;
    jwt_secret_key: string;
    jwt_expires_time: string;
    re_capcha_secret_key: string;
    url_recapcha: string;
    otp_secret_key: string;
    image_token_expires_time: string | number;
    max_attempts_before_recaptcha: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        autoLoadEntities: boolean;
        synchronize: string | number;
    };
    mail: {
        transport: {
            host: string;
            port: number;
            secure: boolean;
            auth: {
                user: string;
                pass: string;
            };
            tls: {
                rejectUnauthorized: boolean;
            };
            debug: boolean;
        };
        defaults: {
            from: string;
        };
    };
    system_name: string;
    system_frontend_url: string;
    jwt_secret_key: string;
    jwt_expires_time: string;
    re_capcha_secret_key: string;
    url_recapcha: string;
    otp_secret_key: string;
    image_token_expires_time: string | number;
    max_attempts_before_recaptcha: string;
}>;
