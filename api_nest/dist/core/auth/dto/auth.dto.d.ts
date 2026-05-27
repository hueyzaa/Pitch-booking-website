export declare class LoginUserDto {
    tai_khoan: string;
    mat_khau: string;
    firebase_token?: string;
    app_type?: string;
}
export declare class ResetPasswordDto {
    token_reset_pass: string;
    mat_khau_moi: string;
}
export declare class ForgotPassDto {
    tai_khoan: string;
    email: string;
}
export declare class LogOutDto {
    nguoi_dung_id: number;
    device_id: string;
}
export declare class VerifyOtpDto {
    email: string;
    otp: string;
}
export declare class SetFirebaseTokenDto {
    firebase_token?: string;
}
export declare class UpdatePersonalRoleDto {
    ma_vai_tro: string;
}
