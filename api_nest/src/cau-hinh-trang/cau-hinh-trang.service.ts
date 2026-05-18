import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CauHinhTrang } from '@database/entities/system/cau-hinh-trang.entity';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { UpdateCauHinhTrangDto } from './dto/update-cau-hinh-trang.dto';

@Injectable()
export class CauHinhTrangService implements OnModuleInit {
  private readonly logger = new Logger(CauHinhTrangService.name);

  constructor(
    @InjectRepository(CauHinhTrang)
    private readonly repo: Repository<CauHinhTrang>,
  ) {}

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

  async updateMany(configs: UpdateCauHinhTrangDto[], user: UserReqData) {
    for (const config of configs) {
      await this.repo.update(
        { key: config.key },
        {
          value: config.value,
          nguoi_cap_nhat: user.id,
          ngay_cap_nhat: new Date(),
        },
      );
    }
    return this.findAll();
  }

  private async seedDefaults() {
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
        value:
          'Một trải nghiệm thị giác được xây dựng trên triết lý tối giản...',
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
}
