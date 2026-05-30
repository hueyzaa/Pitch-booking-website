/// <reference types="multer" />
import { UserReqData } from '../users/interfaces/user-req.interface';
import { ChangePasswordDto, UpdatePasswordDto, UpdateSelfDto } from './dto/profile.dto';
import { UserService as ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    uploadAvatar(file: Express.Multer.File, user: UserReqData): Promise<import("../../database/entities/auth/nguoi-dung.entity").NguoiDung>;
    getProfile(user: UserReqData): Promise<import("../../database/entities/auth/nguoi-dung.entity").NguoiDung>;
    update(user: UserReqData, updateSelfDto: UpdateSelfDto): Promise<import("../../database/entities/auth/nguoi-dung.entity").NguoiDung>;
    changePassword(changePasswordDto: ChangePasswordDto, user: UserReqData): Promise<string>;
    updatePassword(updatePasswordDto: UpdatePasswordDto, user: UserReqData): Promise<string>;
    remove(user: UserReqData): Promise<string>;
}
