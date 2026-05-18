import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { XaService } from './xa.service';

@Controller('xa')
export class XaController {
  constructor(private readonly xaService: XaService) {}

  //TODO Cho phép lấy không check quyền
  @HttpCode(200)
  @Get('options')
  findAllForSelectOptions(@Query() filters: any) {
    return this.xaService.findForSelectOptions(filters);
  }
}
