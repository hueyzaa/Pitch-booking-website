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
import { CreateQuanLyGiaDto, UpdateQuanLyGiaDto } from './dto/quan-ly-gia.dto';
import { QuanLyGiaService } from './quan-ly-gia.service';

@Controller('quan-ly-gia')
export class QuanLyGiaController {
  private readonly logger = new Logger(QuanLyGiaController.name);
  constructor(
    private readonly quanLyGiaService: QuanLyGiaService,
    private readonly helperService: HelperService,
  ) {}

  @CheckPermission(ACTION.create)
  @HttpCode(200)
  @Post()
  create(
    @Body() createQuanLyGiaDto: CreateQuanLyGiaDto,
    @UserReq() user: UserReqData,
  ) {
    createQuanLyGiaDto.nguoi_tao = user.id;
    createQuanLyGiaDto.nguoi_cap_nhat = user.id;
    return this.quanLyGiaService.create(createQuanLyGiaDto);
  }

  @CheckPermission(ACTION.export)
  @HttpCode(200)
  @Get('excel')
  async exportExcel(@Query() filters: FilterData, @Response() res: any) {
    filters.limit = -1;
    const data = await this.quanLyGiaService.findAllWithPagination(filters);

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
    return this.quanLyGiaService.findForSelectOptions(filters);
  }

  @HttpCode(200)
  @Get('san/:id_san')
  findPriceBySan(@Param('id_san') id_san: string) {
    return this.quanLyGiaService.findPriceBySan(+id_san);
  }

  @CheckPermission(ACTION.index)
  @HttpCode(200)
  @Get()
  findAll(@Query() filters: FilterData) {
    return this.quanLyGiaService.findAllWithPagination(filters);
  }

  @CheckPermission(ACTION.show)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quanLyGiaService.findOneById(+id);
  }

  @CheckPermission(ACTION.edit)
  @HttpCode(200)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuanLyGiaDto: UpdateQuanLyGiaDto,
    @UserReq() user: UserReqData,
  ) {
    updateQuanLyGiaDto.nguoi_cap_nhat = user.id;
    return this.quanLyGiaService.update(+id, updateQuanLyGiaDto);
  }

  @CheckPermission(ACTION.delete)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quanLyGiaService.remove(+id);
  }
}
