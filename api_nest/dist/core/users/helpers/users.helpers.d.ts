import { VaiTro } from '@database/entities/auth/vai-tro.entity';
import { Repository } from 'typeorm';
import { Gender } from '../constants/users.constants';
import { CreateUsersDto } from '../dto/users.dto';
export declare function buildFullName(ho: string, ten: string): string;
export declare function parseGenderFromVietnamese(genderText: string): Gender;
export declare function validateRole(roleCode: string, vaiTroRepo: Repository<VaiTro>): Promise<VaiTro>;
export declare function mapExcelRowToUserDto(row: any, userId: number): CreateUsersDto;
export declare function formatImportResult(success: any[], fail: any[], pathResult: string): {
    success: number;
    fail: number;
    danh_sach_thanh_cong: any[];
    danh_sach_that_bai: any[];
    path_result: string;
};
export declare function validateMultipleRoles(roleIds: number[], vaiTroRepo: Repository<VaiTro>): Promise<VaiTro[]>;
export declare function createUserRoleMappings(userId: number, roleIds: number[]): Array<{
    nguoi_dung_id: number;
    vai_tro_id: number;
}>;
export declare function sanitizeUserResponse(user: any): any;
