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
} from '@nestjs/common';
import { CreateThongBaoDto, UpdateThongBaoDto } from './dto/thong-bao.dto';
import { ThongBaoService } from './thong-bao.service';

@Controller('thong-bao')
export class ThongBaoController {
  constructor(private readonly thongBaoService: ThongBaoService) {}

  @CheckPermission(ACTION.create)
  @HttpCode(200)
  @Post()
  create(
    @Body() createThongBaoDto: CreateThongBaoDto,
    @UserReq() user: UserReqData,
  ) {
    createThongBaoDto.nguoi_tao = user.id;
    createThongBaoDto.nguoi_cap_nhat = user.id;
    return this.thongBaoService.create(createThongBaoDto);
  }

  //TODO Cho phép lấy không check quyền
  @HttpCode(200)
  @Get('options')
  findAllForSelectOptions(@Query() filters: any) {
    return this.thongBaoService.findForSelectOptions(filters);
  }

  @CheckPermission(ACTION.index)
  @HttpCode(200)
  @Get()
  findAll(@Query() filters: FilterData) {
    return this.thongBaoService.findAllWithPagination(filters);
  }

  @CheckPermission(ACTION.show)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.thongBaoService.findOneById(+id);
  }

  @CheckPermission(ACTION.edit)
  @HttpCode(200)
  @Patch('mark-all-read')
  markAllRead(@UserReq() user: UserReqData) {
    return this.thongBaoService.markAllRead(user.id);
  }

  @CheckPermission(ACTION.edit)
  @HttpCode(200)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateThongBaoDto: UpdateThongBaoDto,
    @UserReq() user: UserReqData,
  ) {
    updateThongBaoDto.nguoi_cap_nhat = user.id;
    return this.thongBaoService.update(+id, updateThongBaoDto);
  }

  @CheckPermission(ACTION.delete)
  @HttpCode(200)
  @Delete('all')
  deleteAll(@UserReq() user: UserReqData) {
    return this.thongBaoService.deleteAllByUserId(user.id);
  }

  @CheckPermission(ACTION.delete)
  @HttpCode(200)
  @Post('bulk-delete')
  bulkDelete(@Body('ids') ids: number[]) {
    return this.thongBaoService.bulkDelete(ids);
  }

  @CheckPermission(ACTION.delete)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.thongBaoService.remove(+id);
  }
}
