export declare class CreateUsersDto {
    ho: string;
    ten: string;
    tai_khoan: string;
    mat_khau: string;
    so_dien_thoai: string;
    ngay_sinh: Date;
    gioi_tinh: number;
    dia_chi: string;
    tinh_id: number;
    xa_id: number;
    email: string;
    vai_tro_ids: number[];
    ma_vai_tro?: string;
    trang_thai: number;
    ho_va_ten?: string;
    id_doi_tuong?: number;
    san_yeu_thich?: string;
    nguoi_tao?: number;
    ngay_tao?: string;
    nguoi_cap_nhat?: number;
    ngay_cap_nhat?: string;
}
declare const UpdateUsersDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUsersDto>>;
export declare class UpdateUsersDto extends UpdateUsersDto_base {
    ho: string;
    ten: string;
    so_dien_thoai: string;
    ngay_sinh: Date;
    gioi_tinh: number;
    dia_chi: string;
    tinh_id: number;
    xa_id: number;
    email: string;
    vai_tro_ids: number[];
    ma_vai_tro?: string;
    trang_thai: number;
    ho_va_ten?: string;
    id_doi_tuong?: number;
    san_yeu_thich?: string;
    nguoi_cap_nhat?: number;
    ngay_cap_nhat?: string;
}
export declare class ImportExcelResponseDto {
    filePath: string;
    fileName: string;
    successCount: number;
    failCount: number;
}
export {};
