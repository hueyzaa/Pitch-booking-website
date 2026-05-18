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
  Get,
  HttpCode,
  Post,
  Query,
  Response,
  Logger,
} from '@nestjs/common';
import { CreateLogThaoTacDto } from './dto/log-thao-tac.dto';
import { LogThaoTacService } from './log-thao-tac.service';

@Controller('log-thao-tac')
export class LogThaoTacController {
  private readonly logger = new Logger(LogThaoTacController.name);
  constructor(
    private readonly logThaoTacService: LogThaoTacService,
    private readonly helperService: HelperService,
  ) {}

  @CheckPermission(ACTION.create)
  @HttpCode(200)
  @Post()
  create(
    @Body() createLogThaoTacDto: CreateLogThaoTacDto,
    @UserReq() user: UserReqData,
  ) {
    createLogThaoTacDto.user_id = user.id;
    createLogThaoTacDto.user_name = user.ho_va_ten;
    return this.logThaoTacService.create(createLogThaoTacDto);
  }

  @CheckPermission(ACTION.export)
  @HttpCode(200)
  @Get('excel')
  async exportExcel(@Query() filters: FilterData, @Response() res: any) {
    filters.limit = -1;
    const data = await this.logThaoTacService.findAllWithPagination(filters);

    if (data.total > 0) {
      const xlsxBuffer = await this.helperService.jsonToXlsx(data.collection);
      return res
        .set('Content-Disposition', `attachment; filename=${Date.now()}.xlsx`)
        .send(xlsxBuffer);
    } else {
      throw new HttpCoreException('Không tồn tại dữ liệu');
    }
  }

  @CheckPermission(ACTION.index)
  @HttpCode(200)
  @Get()
  findAll(@Query() filters: FilterData) {
    return this.logThaoTacService.findAllWithPagination(filters);
  }
}
