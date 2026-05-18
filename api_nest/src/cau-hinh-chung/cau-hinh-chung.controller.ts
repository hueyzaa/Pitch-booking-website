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
import { CreateCauHinhChungDto } from './dto/cau-hinh-chung.dto';
import { CauHinhChungService } from './cau-hinh-chung.service';
import { HTTP_CODE } from '@configs/contanst';

@Controller('cau-hinh-chung')
export class CauHinhChungController {
  private readonly logger = new Logger(CauHinhChungController.name);
  constructor(
    private readonly cauHinhChungService: CauHinhChungService,
    private readonly helperService: HelperService,
  ) {}

  @CheckPermission(ACTION.create)
  @HttpCode(200)
  @Post()
  create(
    @Body() createCauHinhChungDto: CreateCauHinhChungDto,
    @UserReq() user: UserReqData,
  ) {
    createCauHinhChungDto.nguoi_tao = user.id;
    createCauHinhChungDto.nguoi_cap_nhat = user.id;
    return this.cauHinhChungService.create(createCauHinhChungDto);
  }

  @CheckPermission(ACTION.export)
  @HttpCode(200)
  @Get('excel')
  async exportExcel(@Query() filters: FilterData, @Response() res: any) {
    filters.limit = -1;
    const data = await this.cauHinhChungService.findAllWithPagination(filters);

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
    return this.cauHinhChungService.findForSelectOptions(filters);
  }

  @CheckPermission(ACTION.index)
  @HttpCode(200)
  @Get()
  findAll(@Query() filters: FilterData) {
    return this.cauHinhChungService.findAllWithPagination(filters);
  }

  @CheckPermission(ACTION.show)
  @HttpCode(200)
  @Get('specific-configs')
  findSpecificConfigs() {
    return this.cauHinhChungService.findSpecificConfigs();
  }

  @CheckPermission(ACTION.show)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cauHinhChungService.findOneById(+id);
  }

  @CheckPermission(ACTION.edit)
  @HttpCode(200)
  @Patch()
  async update(
    @Body() updateConfigsDto: { key: string; value: string }[],
    @UserReq() user: UserReqData,
  ) {
    if (!Array.isArray(updateConfigsDto)) {
      throw new HttpCoreException(
        'Dữ liệu không hợp lệ',
        HTTP_CODE.UNPROCESSABLE_CONTENT,
      );
    }

    const result = await this.cauHinhChungService.updateConfigs(
      updateConfigsDto,
      user,
    );
    return { message: 'Cập nhật thành công', result };
  }

  @CheckPermission(ACTION.delete)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cauHinhChungService.remove(+id);
  }
}
