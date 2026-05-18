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
var CauHinhTrangService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CauHinhTrangService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cau_hinh_trang_entity_1 = require("../database/entities/system/cau-hinh-trang.entity");
let CauHinhTrangService = CauHinhTrangService_1 = class CauHinhTrangService {
    constructor(repo) {
        this.repo = repo;
        this.logger = new common_1.Logger(CauHinhTrangService_1.name);
    }
    async onModuleInit() {
        await this.seedDefaults();
    }
    async findAll() {
        return await this.repo.find({ order: { id: 'ASC' } });
    }
    async findPublic() {
        const publicKeys = [
            'HEADER_LOGO',
            'HEADER_TITLE',
            'FOOTER_LOGO',
            'FOOTER_COPYRIGHT',
            'FOOTER_DESCRIPTION',
            'CONTACT_EMAIL',
            'CONTACT_PHONE',
            'CONTACT_ADDRESS',
            'ABOUT_HEADLINE_SUFFIX',
            'HOME_HERO_BADGE',
            'HOME_HERO_TITLE_MAIN',
            'HOME_HERO_TITLE_ACCENT',
            'HOME_HERO_TITLE_SUFFIX',
            'HOME_HERO_DESC',
            'HOME_HERO_IMG',
        ];
        const configs = await this.repo.find();
        return configs.filter((c) => publicKeys.includes(c.key));
    }
    async updateMany(configs, user) {
        for (const config of configs) {
            await this.repo.update({ key: config.key }, {
                value: config.value,
                nguoi_cap_nhat: user.id,
                ngay_cap_nhat: new Date(),
            });
        }
        return this.findAll();
    }
    async seedDefaults() {
        const defaults = [
            {
                key: 'HEADER_LOGO',
                value: '',
                mo_ta: 'Logo hiển thị trên Header',
                loai: 'image',
            },
            {
                key: 'HEADER_TITLE',
                value: 'My Portfolio',
                mo_ta: 'Tiêu đề hiển thị cạnh Logo',
                loai: 'text',
            },
            {
                key: 'FOOTER_LOGO',
                value: '',
                mo_ta: 'Logo hiển thị dưới Footer',
                loai: 'image',
            },
            {
                key: 'FOOTER_COPYRIGHT',
                value: '© 2026 My Portfolio. All rights reserved.',
                mo_ta: 'Thông tin bản quyền',
                loai: 'text',
            },
            {
                key: 'FOOTER_DESCRIPTION',
                value: 'Chào mừng bạn đến với portfolio của tôi.',
                mo_ta: 'Mô tả ngắn ở Footer',
                loai: 'text',
            },
            {
                key: 'CONTACT_EMAIL',
                value: '',
                mo_ta: 'Email liên hệ',
                loai: 'text',
            },
            {
                key: 'CONTACT_PHONE',
                value: '',
                mo_ta: 'Số điện thoại liên hệ',
                loai: 'text',
            },
            {
                key: 'CONTACT_ADDRESS',
                value: '',
                mo_ta: 'Địa chỉ liên hệ',
                loai: 'text',
            },
            {
                key: 'ABOUT_HEADLINE_SUFFIX',
                value: 'that resonate.',
                mo_ta: 'Hậu tố tiêu đề trang About (ví dụ: that resonate.)',
                loai: 'text',
            },
            {
                key: 'HOME_HERO_BADGE',
                value: 'UI Designer',
                mo_ta: 'Text hiển thị ở Badge trang chủ',
                loai: 'text',
            },
            {
                key: 'HOME_HERO_TITLE_MAIN',
                value: 'NGUYỄN',
                mo_ta: 'Tiêu đề chính trang chủ (Dòng 1)',
                loai: 'text',
            },
            {
                key: 'HOME_HERO_TITLE_ACCENT',
                value: 'Digital',
                mo_ta: 'Tiêu đề nhấn mạnh (Dòng 2 - In nghiêng)',
                loai: 'text',
            },
            {
                key: 'HOME_HERO_TITLE_SUFFIX',
                value: 'EXPERIENCE',
                mo_ta: 'Tiêu đề hậu tố trang chủ (Dòng 3)',
                loai: 'text',
            },
            {
                key: 'HOME_HERO_DESC',
                value: 'Một trải nghiệm thị giác được xây dựng trên triết lý tối giản...',
                mo_ta: 'Mô tả ngắn trang chủ',
                loai: 'text',
            },
            {
                key: 'HOME_HERO_IMG',
                value: 'src/assets/hero-visual.png',
                mo_ta: 'Hình ảnh Hero trang chủ',
                loai: 'image',
            },
        ];
        for (const d of defaults) {
            const exists = await this.repo.findOneBy({ key: d.key });
            if (!exists) {
                await this.repo.save(this.repo.create(d));
            }
        }
    }
};
CauHinhTrangService = CauHinhTrangService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cau_hinh_trang_entity_1.CauHinhTrang)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CauHinhTrangService);
exports.CauHinhTrangService = CauHinhTrangService;
//# sourceMappingURL=cau-hinh-trang.service.js.map