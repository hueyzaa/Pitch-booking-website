import { DatabaseService } from 'src/database/database.service';
import { NguoiDung } from 'src/database/entities/auth/nguoi-dung.entity';
import { HelperService } from 'src/helper/helper.service';
import { Repository } from 'typeorm';
import { ChangePasswordDto, UpdatePasswordDto, UpdateSelfDto } from './dto/profile.dto';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
export declare class UserService {
    private readonly databaseService;
    private readonly helperService;
    private nguoiDungRepo;
    constructor(databaseService: DatabaseService, helperService: HelperService, nguoiDungRepo: Repository<NguoiDung>);
    updateAvatar(id: number, path: string): Promise<NguoiDung>;
    findOneByUserName(taiKhoan: string): Promise<NguoiDung>;
    findOneByUsernameOrEmailOrSDT(taiKhoan: string): Promise<NguoiDung>;
    findOneByEmail(email: string): Promise<NguoiDung>;
    changePassword(tai_khoan: string, payload: ChangePasswordDto): Promise<string>;
    updatePassword(user: UserReqData, payload: UpdatePasswordDto): Promise<string>;
    findOneById(id: number): Promise<NguoiDung>;
    update(id: number, updateSelfDto: UpdateSelfDto): Promise<NguoiDung>;
    remove(id: number): Promise<string>;
    updateResetPassToken(tai_khoan: string, token: string): Promise<import("typeorm").UpdateResult>;
    updateNewPassword(email: string, newPass: string): Promise<import("typeorm").UpdateResult>;
}
