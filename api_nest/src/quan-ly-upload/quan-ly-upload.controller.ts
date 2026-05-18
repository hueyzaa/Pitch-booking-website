import { HelperService } from '@helper/helper.service'; // eslint-disable-line
import { ACTION } from '@configs/main.config';
import { CheckPermission } from '@core/decorators/check-permission.decorator';
import { FilterData } from '@database/interfaces/filter-data.interface';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Query,
  Logger,
  Post,
  Body,
} from '@nestjs/common';
import { QuanLyUploadService } from './quan-ly-upload.service';
import { UserReq } from '@core/decorators/user.decorator';
import { UserReqData } from '@core/users/interfaces/user-req.interface';

@Controller('quan-ly-upload')
export class QuanLyUploadController {
  private readonly logger = new Logger(QuanLyUploadController.name);
  constructor(
    private readonly quanLyUploadService: QuanLyUploadService,
    private readonly helperService: HelperService,
  ) {}

  // @CheckPermission(ACTION.create)
  // @HttpCode(200)
  // @Post()
  // create(@Body() createQuanLyUploadDto: CreateQuanLyUploadDto, @UserReq() user: UserReqData) {
  //   createQuanLyUploadDto.nguoi_tao = user.id;
  //   createQuanLyUploadDto.nguoi_cap_nhat = user.id;
  //   return this.quanLyUploadService.create(createQuanLyUploadDto);
  // }

  // @CheckPermission(ACTION.export)
  // @HttpCode(200)
  // @Get('excel')
  // async exportExcel(@Query() filters: FilterData, @Response() res: any) {
  //   filters.limit = -1;
  //   const data = await this.quanLyUploadService.findAllWithPagination(filters);

  //   if (data.total > 0) {
  //     const xlsxBuffer = await this.helperService.jsonToXlsx(data.collection);
  //     return res
  //       .set('Content-Disposition', `attachment; filename=${Date.now()}.xlsx`)
  //       .send(xlsxBuffer);
  //   } else {
  //     throw new HttpCoreException('Không tồn tại dữ liệu');
  //   }
  // }

  //TODO Cho phép lấy không check quyền
  @HttpCode(200)
  @Get('options')
  findAllForSelectOptions(@Query() filters: any) {
    return this.quanLyUploadService.findForSelectOptions(filters);
  }

  @CheckPermission(ACTION.index)
  @HttpCode(200)
  @Get()
  findAll(@Query() filters: FilterData, @UserReq() user: UserReqData) {
    return this.quanLyUploadService.findAllWithPagination(filters, user.id);
  }

  @CheckPermission(ACTION.show)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string, @UserReq() user: UserReqData) {
    return this.quanLyUploadService.findOneByIdWithPermission(+id, user.id);
  }

  @CheckPermission(ACTION.edit)
  @HttpCode(200)
  @Post(':id/grant-view')
  async grantViewPermission(
    @Param('id') id: string,
    @Body() body: { user_ids: number[] },
    @UserReq() user: UserReqData,
  ) {
    // Chỉ chủ file mới được cấp quyền
    await this.quanLyUploadService.grantViewPermission(
      +id,
      body.user_ids,
      user.id,
    );
    return { success: true };
  }

  // @CheckPermission(ACTION.edit)
  // @HttpCode(200)
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateQuanLyUploadDto: UpdateQuanLyUploadDto,
  //   @UserReq() user: UserReqData,
  // ) {
  //   updateQuanLyUploadDto.nguoi_cap_nhat = user.id;
  //   return this.quanLyUploadService.update(+id, updateQuanLyUploadDto);
  // }

  @CheckPermission(ACTION.delete)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quanLyUploadService.remove(+id);
  }
}
