import { ACTION } from '@configs/main.config';
import { CheckPermission } from '@core/decorators/check-permission.decorator';
import { UserReq } from '@core/decorators/user.decorator';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { Body, Controller, Get, HttpCode, Logger, Post } from '@nestjs/common';
import { CreateHeThongDto } from './dto/he-thong.dto';
import { HeThongService } from './he-thong.service';

@Controller('he-thong')
export class HeThongController {
  private readonly logger = new Logger(HeThongController.name);
  constructor(private readonly heThongService: HeThongService) {}

  @CheckPermission(ACTION.create)
  @HttpCode(200)
  @Post('/update-logo-va-ten')
  create(
    @Body() createHeThongDto: CreateHeThongDto,
    @UserReq() user: UserReqData,
  ) {
    createHeThongDto.nguoi_tao = user.id;
    createHeThongDto.nguoi_cap_nhat = user.id;
    return this.heThongService.create(createHeThongDto);
  }

  @HttpCode(200)
  @Get('/get-logo-va-ten')
  async getLatestRecord() {
    return this.heThongService.getLatestRecord();
  }
}
