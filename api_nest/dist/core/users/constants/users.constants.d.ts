export declare enum Gender {
    FEMALE = 0,
    MALE = 1
}
export declare const GENDER_MAPPING: Record<string, Gender>;
export declare const USER_EXCEL_COLUMNS: {
    readonly HO: "A";
    readonly TEN: "B";
    readonly TAI_KHOAN: "C";
    readonly MAT_KHAU: "D";
    readonly SO_DIEN_THOAI: "E";
    readonly NGAY_SINH: "F";
    readonly GIOI_TINH: "G";
    readonly DIA_CHI: "H";
    readonly TINH_ID: "I";
    readonly XA_ID: "J";
    readonly EMAIL: "K";
    readonly MA_VAI_TRO: "L";
    readonly TRANG_THAI: "M";
};
export declare const USER_EXCEL_HEADERS: string[];
export declare const ALLOWED_EXCEL_MIME_TYPES: string[];
export declare const EXCEL_DATE_FORMAT = "DD/MM/YYYY";
export declare const DB_DATE_FORMAT = "YYYY-MM-DD";
export declare const DB_DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
