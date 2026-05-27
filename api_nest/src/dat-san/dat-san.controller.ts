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
import { CreateDatSanDto, UpdateDatSanDto } from './dto/dat-san.dto';
import { DatSanService } from './dat-san.service';

@Controller('dat-san')
export class DatSanController {
  private readonly logger = new Logger(DatSanController.name);
  constructor(
    private readonly datSanService: DatSanService,
    private readonly helperService: HelperService,
  ) {}

  // ==================== PUBLIC ENDPOINTS (không cần quyền admin) ====================

  /**
   * Lấy danh sách khung giờ đã đặt / bảo trì của 1 sân trong 1 ngày.
   * GET /dat-san/public/booked-slots?id_san=1&ngay=2026-05-27
   */
  @HttpCode(200)
  @Get('public/booked-slots')
  findBookedSlots(
    @Query('id_san') id_san: string,
    @Query('ngay') ngay: string,
  ) {
    if (!id_san || !ngay) {
      return [];
    }
    return this.datSanService.findBookedSlots(+id_san, ngay);
  }

  /**
   * Tạo đặt sân từ website công khai (user đã đăng nhập).
   * POST /dat-san/public/book
   */
  @HttpCode(200)
  @Post('public/book')
  publicBook(@Body() body: any) {
    return this.datSanService.publicCreate(body);
  }

  /**
   * Lấy lịch sử đặt sân của user theo tai_khoan.
   * GET /dat-san/public/my-bookings?tai_khoan=xxx
   */
  @HttpCode(200)
  @Get('public/my-bookings')
  findMyBookings(@Query('tai_khoan') tai_khoan: string) {
    if (!tai_khoan) {
      return [];
    }
    return this.datSanService.findByTaiKhoan(tai_khoan);
  }

  // ==================== ADMIN ENDPOINTS (cần quyền) ====================

  @CheckPermission(ACTION.create)
  @HttpCode(200)
  @Post()
  create(
    @Body() createDatSanDto: CreateDatSanDto,
    @UserReq() user: UserReqData,
  ) {
    createDatSanDto.nguoi_tao = user.id;
    createDatSanDto.nguoi_cap_nhat = user.id;
    return this.datSanService.create(createDatSanDto);
  }

  @CheckPermission(ACTION.export)
  @HttpCode(200)
  @Get('excel')
  async exportExcel(@Query() filters: FilterData, @Response() res: any) {
    filters.limit = -1;
    const data = await this.datSanService.findAllWithPagination(filters);

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
    return this.datSanService.findForSelectOptions(filters);
  }

  @CheckPermission(ACTION.index)
  @HttpCode(200)
  @Get()
  findAll(@Query() filters: FilterData) {
    return this.datSanService.findAllWithPagination(filters);
  }

  @CheckPermission(ACTION.show)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datSanService.findOneById(+id);
  }

  @CheckPermission(ACTION.edit)
  @HttpCode(200)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDatSanDto: UpdateDatSanDto,
    @UserReq() user: UserReqData,
  ) {
    updateDatSanDto.nguoi_cap_nhat = user.id;
    return this.datSanService.update(+id, updateDatSanDto);
  }

  @CheckPermission(ACTION.delete)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datSanService.remove(+id);
  }
}
