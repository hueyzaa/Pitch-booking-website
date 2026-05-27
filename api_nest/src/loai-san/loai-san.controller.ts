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
import { CreateLoaiSanDto, UpdateLoaiSanDto } from './dto/loai-san.dto';
import { LoaiSanService } from './loai-san.service';

@Controller('loai-san')
export class LoaiSanController {
  private readonly logger = new Logger(LoaiSanController.name);
  constructor(
    private readonly loaiSanService: LoaiSanService,
    private readonly helperService: HelperService,
  ) {}

  @CheckPermission(ACTION.create)
  @HttpCode(200)
  @Post()
  create(
    @Body() createLoaiSanDto: CreateLoaiSanDto,
    @UserReq() user: UserReqData,
  ) {
    createLoaiSanDto.nguoi_tao = user.id;
    createLoaiSanDto.nguoi_cap_nhat = user.id;
    return this.loaiSanService.create(createLoaiSanDto);
  }

  @CheckPermission(ACTION.export)
  @HttpCode(200)
  @Get('excel')
  async exportExcel(@Query() filters: FilterData, @Response() res: any) {
    filters.limit = -1;
    const data = await this.loaiSanService.findAllWithPagination(filters);

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
    return this.loaiSanService.findForSelectOptions(filters);
  }

  @HttpCode(200)
  @Get()
  findAll(@Query() filters: FilterData) {
    return this.loaiSanService.findAllWithPagination(filters);
  }

  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loaiSanService.findOneById(+id);
  }

  @CheckPermission(ACTION.edit)
  @HttpCode(200)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLoaiSanDto: UpdateLoaiSanDto,
    @UserReq() user: UserReqData,
  ) {
    updateLoaiSanDto.nguoi_cap_nhat = user.id;
    return this.loaiSanService.update(+id, updateLoaiSanDto);
  }

  @CheckPermission(ACTION.delete)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loaiSanService.remove(+id);
  }
}
