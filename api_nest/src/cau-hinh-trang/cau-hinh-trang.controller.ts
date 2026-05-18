import { Body, Controller, Get, Patch, HttpCode } from '@nestjs/common';
import { CauHinhTrangService } from './cau-hinh-trang.service';
import { UserReq } from '@core/decorators/user.decorator';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { UpdateCauHinhTrangDto } from './dto/update-cau-hinh-trang.dto';
import { CheckPermission } from '@core/decorators/check-permission.decorator';
import { ACTION } from '@configs/main.config';

@Controller('cau-hinh-trang')
export class CauHinhTrangController {
  constructor(private readonly service: CauHinhTrangService) {}

  @CheckPermission(ACTION.index)
  @HttpCode(200)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('public')
  @HttpCode(200)
  findPublic() {
    return this.service.findPublic();
  }

  @CheckPermission(ACTION.edit)
  @HttpCode(200)
  @Patch()
  updateMany(
    @Body() configs: UpdateCauHinhTrangDto[],
    @UserReq() user: UserReqData,
  ) {
    return this.service.updateMany(configs, user);
  }
}
