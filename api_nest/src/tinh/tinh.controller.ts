import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { TinhService } from './tinh.service';

@Controller('tinh')
export class TinhController {
  constructor(private readonly tinhService: TinhService) {}
  //TODO Cho phép lấy không check quyền
  @HttpCode(200)
  @Get('options')
  findAllForSelectOptions(@Query() filters: any) {
    return this.tinhService.findForSelectOptions(filters);
  }
}
