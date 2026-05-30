import { ACTION } from '@configs/main.config';
import { CheckPermission } from '@core/decorators/check-permission.decorator';
import { UserReq } from '@core/decorators/user.decorator';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as sharp from 'sharp';
import { CreateHeThongDto } from './dto/he-thong.dto';
import { HeThongService } from './he-thong.service';

@Controller('he-thong')
export class HeThongController {
  private readonly logger = new Logger(HeThongController.name);
  constructor(private readonly heThongService: HeThongService) {}

  @CheckPermission(ACTION.create)
  @HttpCode(200)
  @Post('/update-logo-va-ten')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async create(
    @Body() createHeThongDto: CreateHeThongDto,
    @UserReq() user: UserReqData,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createHeThongDto.nguoi_tao = user.id;
    createHeThongDto.nguoi_cap_nhat = user.id;

    // Nếu có file, chuyển sang Base64
    if (file) {
      const resizedBuffer = await sharp(file.buffer)
        .resize({ width: 1024, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();
      createHeThongDto.logoUrl = `data:image/jpeg;base64,${resizedBuffer.toString(
        'base64',
      )}`;
    }

    return this.heThongService.create(createHeThongDto);
  }

  @HttpCode(200)
  @Get('/get-logo-va-ten')
  async getLatestRecord() {
    return this.heThongService.getLatestRecord();
  }
}
