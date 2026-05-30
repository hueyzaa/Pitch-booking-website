import { HttpCoreException } from '@core/exceptions/core.exception';
import { HelperService } from '@helper/helper.service';
import { ACTION } from '@configs/main.config';
import { CheckPermission } from '@core/decorators/check-permission.decorator';
import { UserReq } from '@core/decorators/user.decorator';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { FilterData } from '@database/interfaces/filter-data.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Response,
  Logger,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as sharp from 'sharp';
import { CreateSanDto, UpdateSanDto } from './dto/san.dto';
import { SanService } from './san.service';

@Controller('san')
export class SanController {
  private readonly logger = new Logger(SanController.name);
  constructor(
    private readonly sanService: SanService,
    private readonly helperService: HelperService,
  ) {}

  /**
   * Chuyển file buffer sang Base64 data URI, resize + compress bằng sharp
   */
  private async fileToBase64(file: Express.Multer.File): Promise<string> {
    const resizedBuffer = await sharp(file.buffer)
      .resize({ width: 1024, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();
    return `data:image/jpeg;base64,${resizedBuffer.toString('base64')}`;
  }

  @CheckPermission(ACTION.create)
  @HttpCode(200)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'anh_chinh', maxCount: 1 },
        { name: 'anh_chi_tiet', maxCount: 10 },
      ],
      { storage: multer.memoryStorage() },
    ),
  )
  async create(
    @Body() createSanDto: CreateSanDto,
    @UserReq() user: UserReqData,
    @UploadedFiles()
    files: {
      anh_chinh?: Express.Multer.File[];
      anh_chi_tiet?: Express.Multer.File[];
    },
  ) {
    createSanDto.nguoi_tao = user.id;
    createSanDto.nguoi_cap_nhat = user.id;

    // Chuyển ảnh chính sang Base64
    if (files?.anh_chinh?.[0]) {
      createSanDto.anh_chinh = await this.fileToBase64(files.anh_chinh[0]);
    }

    // Chuyển ảnh chi tiết sang Base64 (lưu dạng JSON array)
    if (files?.anh_chi_tiet?.length) {
      const base64Arr = await Promise.all(
        files.anh_chi_tiet.map((f) => this.fileToBase64(f)),
      );
      createSanDto.anh_chi_tiet = JSON.stringify(base64Arr);
    }

    return this.sanService.create(createSanDto);
  }

  @CheckPermission(ACTION.export)
  @HttpCode(200)
  @Get('excel')
  async exportExcel(@Query() filters: FilterData, @Response() res: any) {
    filters.limit = -1;
    const data = await this.sanService.findAllWithPagination(filters);

    if (data.total > 0) {
      const xlsxBuffer = await this.helperService.jsonToXlsx(data.collection);
      return res
        .set('Content-Disposition', `attachment; filename=${Date.now()}.xlsx`)
        .send(xlsxBuffer);
    } else {
      throw new HttpCoreException('Không tồn tại dữ liệu');
    }
  }

  //TODO Cho phép lấy không check quyền
  @HttpCode(200)
  @Get('options')
  findAllForSelectOptions(@Query() filters: any) {
    return this.sanService.findForSelectOptions(filters);
  }

  @HttpCode(200)
  @Get()
  findAll(@Query() filters: FilterData) {
    return this.sanService.findAllWithPagination(filters);
  }

  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sanService.findOneById(+id);
  }

  @CheckPermission(ACTION.edit)
  @HttpCode(200)
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'anh_chinh', maxCount: 1 },
        { name: 'anh_chi_tiet', maxCount: 10 },
      ],
      { storage: multer.memoryStorage() },
    ),
  )
  async update(
    @Param('id') id: string,
    @Body() updateSanDto: UpdateSanDto,
    @UserReq() user: UserReqData,
    @UploadedFiles()
    files: {
      anh_chinh?: Express.Multer.File[];
      anh_chi_tiet?: Express.Multer.File[];
    },
  ) {
    updateSanDto.nguoi_cap_nhat = user.id;

    // Chuyển ảnh chính sang Base64 (nếu có file mới)
    if (files?.anh_chinh?.[0]) {
      updateSanDto.anh_chinh = await this.fileToBase64(files.anh_chinh[0]);
    }

    // Chuyển ảnh chi tiết sang Base64 (nếu có file mới)
    if (files?.anh_chi_tiet?.length) {
      const base64Arr = await Promise.all(
        files.anh_chi_tiet.map((f) => this.fileToBase64(f)),
      );
      // Merge: giữ ảnh cũ (Base64 string) + ảnh mới
      let existingImages: string[] = [];
      if (
        updateSanDto.anh_chi_tiet &&
        typeof updateSanDto.anh_chi_tiet === 'string'
      ) {
        try {
          existingImages = JSON.parse(updateSanDto.anh_chi_tiet as string);
        } catch {
          existingImages = [];
        }
      }
      updateSanDto.anh_chi_tiet = JSON.stringify([
        ...existingImages,
        ...base64Arr,
      ]);
    }

    return this.sanService.update(+id, updateSanDto);
  }

  @CheckPermission(ACTION.delete)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sanService.remove(+id);
  }
}
