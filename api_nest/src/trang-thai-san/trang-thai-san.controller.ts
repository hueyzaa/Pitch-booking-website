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
  CreateTrangThaiSanDto,
  UpdateTrangThaiSanDto,
} from './dto/trang-thai-san.dto';
import { TrangThaiSanService } from './trang-thai-san.service';


@Controller('trang-thai-san')
export class TrangThaiSanController {
  private readonly logger = new Logger(TrangThaiSanController.name);
  constructor(
      private readonly trangThaiSanService: TrangThaiSanService,
      private readonly helperService: HelperService,
    ) {}

  @CheckPermission(ACTION.create)
  @HttpCode(200)
  @Post()
  create(@Body() createTrangThaiSanDto: CreateTrangThaiSanDto, @UserReq() user: UserReqData) {
    createTrangThaiSanDto.nguoi_tao = user.id;
    createTrangThaiSanDto.nguoi_cap_nhat = user.id;
    return this.trangThaiSanService.create(createTrangThaiSanDto);
  }

  @CheckPermission(ACTION.export)
  @HttpCode(200)
  @Get('excel')
  async exportExcel(@Query() filters: FilterData, @Response() res: any) {
    filters.limit = -1;
    const data = await this.trangThaiSanService.findAllWithPagination(filters);

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
    return this.trangThaiSanService.findForSelectOptions(filters);
  }

  @CheckPermission(ACTION.index)
  @HttpCode(200)
  @Get()
  findAll(@Query() filters: FilterData) {
    return this.trangThaiSanService.findAllWithPagination(filters);
  }

  @CheckPermission(ACTION.show)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trangThaiSanService.findOneById(+id);
  }

  @CheckPermission(ACTION.edit)
  @HttpCode(200)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrangThaiSanDto: UpdateTrangThaiSanDto,
    @UserReq() user: UserReqData,
  ) {
    updateTrangThaiSanDto.nguoi_cap_nhat = user.id;
    return this.trangThaiSanService.update(+id, updateTrangThaiSanDto);
  }

  @CheckPermission(ACTION.delete)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trangThaiSanService.remove(+id);
  }
}
