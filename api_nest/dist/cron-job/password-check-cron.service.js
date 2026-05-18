"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PasswordCheckCronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordCheckCronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const moment = require("moment");
const users_service_1 = require("../core/users/users.service");
const typeorm_1 = require("@nestjs/typeorm");
const nguoi_dung_entity_1 = require("../database/entities/auth/nguoi-dung.entity");
const typeorm_2 = require("typeorm");
const email_service_1 = require("../core/email/email.service");
const globalConfig_service_1 = require("../core/globalconfig/globalConfig.service");
const profile_service_1 = require("../core/profile/profile.service");
const auth_service_1 = require("../core/auth/auth.service");
const contanst_1 = require("../configs/contanst");
let PasswordCheckCronService = PasswordCheckCronService_1 = class PasswordCheckCronService {
    constructor(usersService, userService, emailService, globalConfigService, authService, nguoiDungRepo) {
        this.usersService = usersService;
        this.userService = userService;
        this.emailService = emailService;
        this.globalConfigService = globalConfigService;
        this.authService = authService;
        this.nguoiDungRepo = nguoiDungRepo;
        this.logger = new common_1.Logger(PasswordCheckCronService_1.name);
    }
    async handleCron() {
        this.logger.log('Starting password check job');
        const [check_valid_pass, pass_valid_time] = await Promise.all([
            this.globalConfigService
                .getConfigByKeyCache('CHECK_VALID_PASS')
                .catch(() => '0'),
            this.globalConfigService
                .getConfigByKeyCache('PASS_VALID_TIME')
                .catch(() => '30'),
        ]);
        const users = await this.nguoiDungRepo.find({
            where: {
                trang_thai: contanst_1.STATUS.ACTIVE,
            },
        });
        if (Number(check_valid_pass) === 1) {
            for (const user of users) {
                const lastPasswordChange = user.last_password_change;
                const daysSinceLastChange = moment().diff(moment(lastPasswordChange), 'days');
                if (lastPasswordChange &&
                    daysSinceLastChange >= Number(pass_valid_time)) {
                    const token = await this.authService.generateUpdatePassToken(user);
                    await this.userService.updateResetPassToken(user.tai_khoan, token);
                    await this.usersService.updateNeedChangePassword(user.id);
                    await this.emailService.sendUpdatePassEmail(user, token);
                    this.logger.log(`Password update email sent for user: ${user.email}`);
                }
            }
        }
        this.logger.log('Password check job completed');
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PasswordCheckCronService.prototype, "handleCron", null);
PasswordCheckCronService = PasswordCheckCronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, typeorm_1.InjectRepository)(nguoi_dung_entity_1.NguoiDung)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        profile_service_1.UserService,
        email_service_1.EmailService,
        globalConfig_service_1.GlobalConfigService,
        auth_service_1.AuthService,
        typeorm_2.Repository])
], PasswordCheckCronService);
exports.PasswordCheckCronService = PasswordCheckCronService;
//# sourceMappingURL=password-check-cron.service.js.map