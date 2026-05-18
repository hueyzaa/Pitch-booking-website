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
  Create[ModuleName]Dto,
  Update[ModuleName]Dto,
} from './dto/[module-name].dto';
import { [ModuleName]Service } from './[module-name].service';


@Controller('[module-name]')
export class [ModuleName]Controller {
  private readonly logger = new Logger([ModuleName]Controller.name);
  constructor(
      private readonly [moduleName]Service: [ModuleName]Service,
      private readonly helperService: HelperService,
    ) {}

  @CheckPermission(ACTION.create)
  @HttpCode(200)
  @Post()
  create(@Body() create[ModuleName]Dto: Create[ModuleName]Dto, @UserReq() user: UserReqData) {
    create[ModuleName]Dto.nguoi_tao = user.id;
    create[ModuleName]Dto.nguoi_cap_nhat = user.id;
    return this.[moduleName]Service.create(create[ModuleName]Dto);
  }

  @CheckPermission(ACTION.export)
  @HttpCode(200)
  @Get('excel')
  async exportExcel(@Query() filters: FilterData, @Response() res: any) {
    filters.limit = -1;
    const data = await this.[moduleName]Service.findAllWithPagination(filters);

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
    return this.[moduleName]Service.findForSelectOptions(filters);
  }

  @CheckPermission(ACTION.index)
  @HttpCode(200)
  @Get()
  findAll(@Query() filters: FilterData) {
    return this.[moduleName]Service.findAllWithPagination(filters);
  }

  @CheckPermission(ACTION.show)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.[moduleName]Service.findOneById(+id);
  }

  @CheckPermission(ACTION.edit)
  @HttpCode(200)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() update[ModuleName]Dto: Update[ModuleName]Dto,
    @UserReq() user: UserReqData,
  ) {
    update[ModuleName]Dto.nguoi_cap_nhat = user.id;
    return this.[moduleName]Service.update(+id, update[ModuleName]Dto);
  }

  @CheckPermission(ACTION.delete)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.[moduleName]Service.remove(+id);
  }
}
