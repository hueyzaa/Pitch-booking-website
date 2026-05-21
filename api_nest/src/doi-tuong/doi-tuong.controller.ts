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
  CreateDoiTuongDto,
  UpdateDoiTuongDto,
} from './dto/doi-tuong.dto';
import { DoiTuongService } from './doi-tuong.service';


@Controller('doi-tuong')
export class DoiTuongController {
  private readonly logger = new Logger(DoiTuongController.name);
  constructor(
      private readonly doiTuongService: DoiTuongService,
      private readonly helperService: HelperService,
    ) {}

  @CheckPermission(ACTION.create)
  @HttpCode(200)
  @Post()
  create(@Body() createDoiTuongDto: CreateDoiTuongDto, @UserReq() user: UserReqData) {
    createDoiTuongDto.nguoi_tao = user.id;
    createDoiTuongDto.nguoi_cap_nhat = user.id;
    return this.doiTuongService.create(createDoiTuongDto);
  }

  @CheckPermission(ACTION.export)
  @HttpCode(200)
  @Get('excel')
  async exportExcel(@Query() filters: FilterData, @Response() res: any) {
    filters.limit = -1;
    const data = await this.doiTuongService.findAllWithPagination(filters);

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
    return this.doiTuongService.findForSelectOptions(filters);
  }

  @CheckPermission(ACTION.index)
  @HttpCode(200)
  @Get()
  findAll(@Query() filters: FilterData) {
    return this.doiTuongService.findAllWithPagination(filters);
  }

  @CheckPermission(ACTION.show)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doiTuongService.findOneById(+id);
  }

  @CheckPermission(ACTION.edit)
  @HttpCode(200)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDoiTuongDto: UpdateDoiTuongDto,
    @UserReq() user: UserReqData,
  ) {
    updateDoiTuongDto.nguoi_cap_nhat = user.id;
    return this.doiTuongService.update(+id, updateDoiTuongDto);
  }

  @CheckPermission(ACTION.delete)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doiTuongService.remove(+id);
  }
}
