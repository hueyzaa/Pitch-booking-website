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
} from '@nestjs/common';
import {
  CreateDanhGiaDto,
  PublicCreateDanhGiaDto,
  UpdateDanhGiaDto,
} from './dto/danh-gia.dto';
import { DanhGiaService } from './danh-gia.service';


@Controller('danh-gia')
export class DanhGiaController {
  private readonly logger = new Logger(DanhGiaController.name);
  constructor(
      private readonly danhGiaService: DanhGiaService,
      private readonly helperService: HelperService,
    ) {}

  // ==========================================
  // PUBLIC ENDPOINTS (KHÔNG CẦN AUTHENTICATION)
  // ==========================================

  @HttpCode(200)
  @Get('public/summary/:id_san')
  async getSummaryBySan(@Param('id_san') idSan: string) {
    if (!idSan || isNaN(+idSan)) {
      throw new HttpCoreException('ID sân không hợp lệ', '400');
    }
    const data = await this.danhGiaService.getSummaryBySanId(+idSan);
    return data;
  }

  @HttpCode(200)
  @Get('public/:id_san')
  async getReviewsBySan(
    @Param('id_san') idSan: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    if (!idSan || isNaN(+idSan)) {
      throw new HttpCoreException('ID sân không hợp lệ', '400');
    }
    const data = await this.danhGiaService.findBySanId(+idSan, +page, +limit);
    return data;
  }

  @HttpCode(200)
  @Post('public')
  async publicCreate(@Body() dto: PublicCreateDanhGiaDto) {
    const data = await this.danhGiaService.publicCreate(dto);
    return data;
  }

  // ==========================================
  // ADMIN ENDPOINTS (CẦN AUTHENTICATION & PERMISSION)
  // ==========================================

  @CheckPermission(ACTION.create)
  @HttpCode(200)
  @Post()
  create(@Body() createDanhGiaDto: CreateDanhGiaDto, @UserReq() user: UserReqData) {
    createDanhGiaDto.nguoi_tao = user.id;
    createDanhGiaDto.nguoi_cap_nhat = user.id;
    return this.danhGiaService.create(createDanhGiaDto);
  }

  @CheckPermission(ACTION.export)
  @HttpCode(200)
  @Get('excel')
  async exportExcel(@Query() filters: FilterData, @Response() res: any) {
    filters.limit = -1;
    const data = await this.danhGiaService.findAllWithPagination(filters);

    if (data.total > 0) {
      const xlsxBuffer = await this.helperService.jsonToXlsx(data.collection);
      return res
        .set('Content-Disposition', `attachment; filename=${Date.now()}.xlsx`)
        .send(xlsxBuffer);
    } else {
      throw new HttpCoreException('Không tồn tại dữ liệu');
    }
  }


  @HttpCode(200)
  @Get('options')
  findAllForSelectOptions(@Query() filters: any) {
    return this.danhGiaService.findForSelectOptions(filters);
  }

  @CheckPermission(ACTION.index)
  @HttpCode(200)
  @Get()
  findAll(@Query() filters: FilterData) {
    return this.danhGiaService.findAllWithPagination(filters);
  }

  @CheckPermission(ACTION.show)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.danhGiaService.findOneById(+id);
  }

  @CheckPermission(ACTION.edit)
  @HttpCode(200)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDanhGiaDto: UpdateDanhGiaDto,
    @UserReq() user: UserReqData,
  ) {
    updateDanhGiaDto.nguoi_cap_nhat = user.id;
    return this.danhGiaService.update(+id, updateDanhGiaDto);
  }

  @CheckPermission(ACTION.delete)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.danhGiaService.remove(+id);
  }
}
