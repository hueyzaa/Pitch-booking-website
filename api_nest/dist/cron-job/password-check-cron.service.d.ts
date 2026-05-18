import { UsersService } from '@core/users/users.service';
import { NguoiDung } from '@database/entities/auth/nguoi-dung.entity';
import { Repository } from 'typeorm';
import { EmailService } from '@core/email/email.service';
import { GlobalConfigService } from '@core/globalconfig/globalConfig.service';
import { UserService } from '@core/profile/profile.service';
import { AuthService } from '@core/auth/auth.service';
export declare class PasswordCheckCronService {
    private readonly usersService;
    private readonly userService;
    private readonly emailService;
    private readonly globalConfigService;
    private readonly authService;
    private readonly nguoiDungRepo;
    private readonly logger;
    constructor(usersService: UsersService, userService: UserService, emailService: EmailService, globalConfigService: GlobalConfigService, authService: AuthService, nguoiDungRepo: Repository<NguoiDung>);
    handleCron(): Promise<void>;
}
