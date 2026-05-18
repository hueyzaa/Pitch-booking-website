import { Controller, Get, HttpCode, Render, Response } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { ExampleModuleService } from './example-module.service';
import { HelperService } from '@helper/helper.service';

@Controller('example-module')
export class ExampleModuleController {
  constructor(
    private readonly exampleModuleService: ExampleModuleService,
    private readonly helperService: HelperService,
  ) {}

  //TODO: Export Hbs
  @HttpCode(200)
  @Get('export-hbs')
  @Render('vi-du')
  async exportHbs() {
    return { truong_du_lieu: 'Trường dữ liệu nè' };
  }

  //TODO: Export Excel
  @HttpCode(200)
  @Get('export-excel')
  async exportExcel(@Response() res: any) {
    const xlsxBuffer = await this.helperService.jsonToXlsx(
      [
        { no: '1', name: 'Nguyễn Văn A' },
        { no: '2', name: 'Nguyễn Văn B' },
      ],
      [
        { header: 'Số thứ tự', key: 'no' },
        { header: 'Họ và Tên', key: 'name' },
      ],
    );

    //TODO Nếu cần lưu vào file
    writeFileSync(
      join(__dirname, '..', '..', 'public', 'exports', 'abc.xlsx'),
      Buffer.from(xlsxBuffer),
    );
    return res.send('OK');
  }

  //TODO: Export PDF From Hbs
  @HttpCode(200)
  @Get('export-pdf')
  async exportPdf(@Response() res: any) {
    const pdfBuffer = await this.helperService.exportPdfFromHbs(
      'views/vi-du.hbs',
      {
        data: { truong_du_lieu: 'Day la truong du lieu' },
      },
    );

    //TODO Nếu cần lưu vào file
    writeFileSync(
      join(__dirname, '..', '..', 'public', 'exports', 'abc.pdf'),
      Buffer.from(pdfBuffer),
    );
    return res.send('OK');
  }
}
