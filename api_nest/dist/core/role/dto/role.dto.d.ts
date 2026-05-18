export declare class CreateRoleDto {
    ten_vai_tro: string;
    ma_vai_tro: string;
    phan_quyen: any;
    nguoi_tao: number;
    nguoi_cap_nhat: number;
}
declare const UpdateRoleDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRoleDto>>;
export declare class UpdateRoleDto extends UpdateRoleDto_base {
    id: number;
    is_active?: boolean;
    ngay_cap_nhat?: Date;
    nguoi_cap_nhat?: number;
}
export {};
