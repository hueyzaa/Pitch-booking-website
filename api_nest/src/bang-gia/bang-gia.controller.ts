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
  CreateBangGiaDto,
  UpdateBangGiaDto,
} from './dto/bang-gia.dto';
import { BangGiaService } from './bang-gia.service';


@Controller('bang-gia')
export class BangGiaController {
  private readonly logger = new Logger(BangGiaController.name);
  constructor(
      private readonly bangGiaService: BangGiaService,
      private readonly helperService: HelperService,
    ) {}

  @CheckPermission(ACTION.create)
  @HttpCode(200)
  @Post()
  create(@Body() createBangGiaDto: CreateBangGiaDto, @UserReq() user: UserReqData) {
    createBangGiaDto.nguoi_tao = user.id;
    createBangGiaDto.nguoi_cap_nhat = user.id;
    return this.bangGiaService.create(createBangGiaDto);
  }

  @CheckPermission(ACTION.export)
  @HttpCode(200)
  @Get('excel')
  async exportExcel(@Query() filters: FilterData, @Response() res: any) {
    filters.limit = -1;
    const data = await this.bangGiaService.findAllWithPagination(filters);

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
    return this.bangGiaService.findForSelectOptions(filters);
  }

  @CheckPermission(ACTION.index)
  @HttpCode(200)
  @Get()
  findAll(@Query() filters: FilterData) {
    return this.bangGiaService.findAllWithPagination(filters);
  }

  @CheckPermission(ACTION.show)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bangGiaService.findOneById(+id);
  }

  @CheckPermission(ACTION.edit)
  @HttpCode(200)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBangGiaDto: UpdateBangGiaDto,
    @UserReq() user: UserReqData,
  ) {
    updateBangGiaDto.nguoi_cap_nhat = user.id;
    return this.bangGiaService.update(+id, updateBangGiaDto);
  }

  @CheckPermission(ACTION.delete)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bangGiaService.remove(+id);
  }
}
