import {
  Body,
  Controller,
  Get,
  Patch,
  HttpCode,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as sharp from 'sharp';
import { CauHinhTrangService } from './cau-hinh-trang.service';
import { UserReq } from '@core/decorators/user.decorator';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { UpdateCauHinhTrangDto } from './dto/update-cau-hinh-trang.dto';
import { CheckPermission } from '@core/decorators/check-permission.decorator';
import { ACTION } from '@configs/main.config';

@Controller('cau-hinh-trang')
export class CauHinhTrangController {
  constructor(private readonly service: CauHinhTrangService) {}

  /**
   * Chuyển file buffer sang Base64 data URI
   */
  private async fileToBase64(file: Express.Multer.File): Promise<string> {
    const resizedBuffer = await sharp(file.buffer)
      .resize({ width: 1024, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();
    return `data:image/jpeg;base64,${resizedBuffer.toString('base64')}`;
  }

  @CheckPermission(ACTION.index)
  @HttpCode(200)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('public')
  @HttpCode(200)
  findPublic() {
    return this.service.findPublic();
  }

  @CheckPermission(ACTION.edit)
  @HttpCode(200)
  @Patch()
  @UseInterceptors(AnyFilesInterceptor({ storage: multer.memoryStorage() }))
  async updateMany(
    @Body() body: any,
    @UserReq() user: UserReqData,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // Body có thể là JSON array hoặc JSON string (khi gửi qua FormData)
    let configs: UpdateCauHinhTrangDto[] = [];
    if (body.configs) {
      configs =
        typeof body.configs === 'string'
          ? JSON.parse(body.configs)
          : body.configs;
    } else if (Array.isArray(body)) {
      configs = body;
    }

    // Nếu có file, chuyển sang Base64 và gán vào config tương ứng
    if (files && files.length > 0) {
      for (const file of files) {
        const base64 = await this.fileToBase64(file);
        // Tìm config có key trùng với fieldname
        const idx = configs.findIndex((c) => c.key === file.fieldname);
        if (idx >= 0) {
          configs[idx].value = base64;
        } else {
          configs.push({ key: file.fieldname, value: base64 });
        }
      }
    }

    return this.service.updateMany(configs, user);
  }
}
