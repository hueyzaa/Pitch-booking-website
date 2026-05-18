import {
  CORE_COMMON_ERROR,
  DATABASE_GENERAL_ERROR,
  HTTP_CODE,
} from '@configs/contanst';
import { HttpCoreException } from '@core/exceptions/core.exception';
import { FilterData } from '@database/interfaces/filter-data.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Workbook } from 'exceljs';
import { readFileSync, promises as fs } from 'fs';
import hbs from 'handlebars';
import * as moment from 'moment';
import * as path from 'path';
import puppeteer from 'puppeteer';
import * as xlsx2json from 'xlsx2json';
import * as _ from 'lodash';
import ExcelJS from 'exceljs';
import { ColumnDefinition } from './interfaces/helper.interface';
import { FailItem } from './interfaces/helper.interface';
import { TABLE_NAMES_TRANSLATIONS } from '@configs/translations.constant';
import * as XLSX from 'xlsx';
@Injectable()
export class HelperService {
  constructor(private readonly jwtService: JwtService) {}
  /**
   * Hàm sleep theo giây
   * @param sec Số giây
   */
  sleep(sec: number) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
  }

  /**
   * Hàm so sánh chuỗi đã băm với bcrypt
   * @param rawString Chuỗi chưa được băm
   * @param hashedString Chuỗi đã băm
   * @returns
   */
  async compareHashed(
    rawString: string,
    hashedString: string,
  ): Promise<boolean> {
    return await bcrypt.compare(rawString, hashedString);
  }

  /**
   * Hàm dùng để kiểm tra JWT
   * @param token
   * @returns
   */
  async verifyJWTToken(token: string) {
    return this.jwtService.verify(token);
  }

  /**
   * Hàm tạo mã JWT
   * @param payload
   * @returns
   */
  async signJWTToken(payload: object, options?: object) {
    return this.jwtService.sign(payload, options);
  }

  /**
   * Chuyên excel -> JSON
   * @param filepath
   * @param row Dòng tiêu đề - bắt đầu ghi dữ liệu row  + 1
   * @returns JSON
   */
  async processXlsxToJson(filepath: string, row = 1, sheet = 0) {
    if (!filepath.endsWith('.xlsx')) {
      throw new HttpCoreException(
        'File không đúng định dạng. Chỉ hỗ trợ file .xlsx!',
        HTTP_CODE.UNPROCESSABLE_CONTENT,
      );
    }

    try {
      const jsonArray = await xlsx2json(filepath);
      const sheetData = _.get(jsonArray, sheet, []);

      if (_.isEmpty(sheetData) || (row > 0 && sheetData.length <= row)) {
        throw new HttpCoreException(
          'File không có dữ liệu. Vui lòng kiểm tra lại!',
          HTTP_CODE.UNPROCESSABLE_CONTENT,
        );
      }

      const rs = _(sheetData)
        .slice(row)
        .filter((element) =>
          [element.A, element.B].some((field) => _.trim(field)),
        )
        .value();

      if (_.isEmpty(rs)) {
        throw new HttpCoreException(
          'File không có dữ liệu. Vui lòng kiểm tra lại!',
          HTTP_CODE.UNPROCESSABLE_CONTENT,
        );
      }

      return rs;
    } catch (error) {
      console.error('Error processing XLSX file:', error);
      throw error;
    }
  }

  /**
   * Hàm chuyển từ file Excel qua Json
   * Hỗ trợ bắt các lỗi cấu trúc file Excel
   * @param filepath
   * @param expectedHeaders
   * @returns
   */
  async processXlsxToJsonVer2(filepath: string, expectedHeaders: string[][]) {
    return new Promise<any>((resolve, reject) => {
      const regex = /.+\.(xls|xlsx)$/i;
      if (!filepath.match(regex)) {
        return reject('Không phải là file Excel');
      }

      try {
        const workbook = XLSX.readFile(filepath);
        const sheetNames = workbook.SheetNames;

        if (sheetNames.length < expectedHeaders.length) {
          return reject(
            `File Excel phải có ít nhất ${expectedHeaders.length} sheet`,
          );
        }

        // Đọc sheet 1
        const sheets = [];
        // Xử lý từng sheet theo expectedHeaders
        for (let i = 0; i < expectedHeaders.length; i++) {
          const sheet = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheetNames[i]],
            { header: 1 },
          );

          // Validate header của sheet
          const header = sheet[0];
          const error = this.validateColumns(header, expectedHeaders[i]);

          if (error) {
            return reject(new HttpCoreException(error, HTTP_CODE.BAD_REQUEST));
          }

          // Remove header
          sheet.shift();
          sheets.push(sheet);
        }
        // Trả về object với tên sheet tương ứng
        const result = {};
        for (let i = 0; i < sheets.length; i++) {
          result[`sheet${i + 1}`] = sheets[i];
        }

        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
      }
    });
  }

  validateColumns(headers: string[], expectedHeaders: string[]): string | null {
    // Chuẩn hóa ký tự xuống dòng: thay \r\n hoặc \r thành \n
    const normalizeString = (str: string) => str.replace(/\r\n|\r/g, '\n');

    const normalizedHeaders = headers.map((h) => normalizeString(h));

    const normalizedExpectedHeaders = expectedHeaders.map((h) =>
      normalizeString(h),
    );

    // So sánh số lượng cột và từng header
    const isValid =
      normalizedHeaders.length === normalizedExpectedHeaders.length &&
      normalizedHeaders.every(
        (header, index) => header === normalizedExpectedHeaders[index],
      );

    if (!isValid) {
      return 'Cấu trúc file không đúng, vui lòng sử dụng đúng mẫu Excel';
    }

    return null; // Hợp lệ
  }

  async genHashedPassword(pass: string) {
    const enbcrypt_pass = await bcrypt.hash(pass, 12);
    return enbcrypt_pass;
  }

  private ones = [
    '',
    'một',
    'hai',
    'ba',
    'bốn',
    'năm',
    'sáu',
    'bảy',
    'tám',
    'chín',
  ];
  private tens = [
    '',
    'mười',
    'hai mươi',
    'ba mươi',
    'bốn mươi',
    'năm mươi',
    'sáu mươi',
    'bảy mươi',
    'tám mươi',
    'chín mươi',
  ];
  private scales = ['', 'nghìn', 'triệu', 'tỷ'];

  convertNumberToWords(num: number) {
    if (num === 0) {
      return 'không đồng';
    } else {
      let words = '';
      let i = 0;
      while (num > 0) {
        if (num % 1000 !== 0) {
          let word = this.convertNumberToWordsUnder1000(num % 1000);
          if (i === 1 && num % 1000 === 110) {
            word = 'một trăm mười';
          }
          words = word + ' ' + this.scales[i] + ' ' + words;
        }
        num = Math.floor(num / 1000);
        i++;
      }
      return words.trim() + ' đồng';
    }
  }

  private convertNumberToWordsUnder1000(num: number): string {
    if (num === 0) {
      return '';
    } else if (num < 10) {
      return this.ones[num];
    } else if (num < 20) {
      return 'mười ' + this.ones[num - 10];
    } else if (num < 100) {
      return (
        this.tens[Math.floor(num / 10)] +
        ' ' +
        this.convertNumberToWordsUnder1000(num % 10)
      );
    } else if (num < 110) {
      return this.ones[Math.floor(num / 100)] + ' trăm mười';
    } else {
      return (
        this.ones[Math.floor(num / 100)] +
        ' trăm ' +
        this.convertNumberToWordsUnder1000(num % 100)
      );
    }
  }

  checkDate(startDate: Date, endDate: Date) {
    return endDate > startDate;
  }

  replaceAll(str: string, searchValue: string, replaceValue: string): string {
    return str.replace(new RegExp(searchValue, 'g'), replaceValue);
  }

  transformObject(obj: any): any {
    const keys = Object.keys(obj);
    for (const key of keys) {
      if (typeof obj[key] === 'object') {
        const nestedObj = obj[key];
        if (nestedObj.hasOwnProperty('name')) {
          obj[key] = nestedObj['name'];
        } else {
          obj[key] = this.transformObject(nestedObj);
        }
      }
    }
    return obj;
  }

  sumArray(arr: number[]): number {
    const result = arr.reduce((sumVal, nextVal) => sumVal + nextVal, 0);
    return result;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   *
   * @param data
   * @param headerConfig
   * @returns
   */
  jsonToXlsx(data: Array<object>, headerConfig?: Array<object>) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('EXPORT');

    //TODO Trong trường hợp không cấu hình header thì tự lấy từ Object ra
    if (data.length < 0) {
      throw new Error('Mảng dữ liệu rỗng. Vui lòng kiểm tra lại');
    }

    const headerConfigDefault = [];
    if (!headerConfig) {
      const objectKeys = Object.keys(data[0]);
      for (const element of objectKeys) {
        headerConfigDefault.push({
          header: element,
          key: element,
        });
      }
    }

    worksheet.columns = headerConfig || headerConfigDefault;

    data.forEach((val) => {
      worksheet.addRow(val);
    });

    return workbook.xlsx.writeBuffer();
  }

  /**
   *
   * @param filePath
   * @param data
   * @param options
   * @returns
   */
  async exportPdfFromHbs(
    filePath: string,
    data: object = {},
    options: object = {},
  ) {
    const browser = await puppeteer.launch();

    try {
      const page = await browser.newPage();

      const html = await readFileSync(filePath, 'utf8');
      const template = hbs.compile(html);
      const htmlContent = template(data);
      await page.setContent(htmlContent);

      const buffer = await page.pdf({
        // path: 'output-abc.pdf',
        format: 'a4',
        printBackground: true,
        margin: {
          left: '10mm',
          top: '10mm',
          right: '10mm',
          bottom: '10mm',
        },
        ...options,
      });
      await browser.close();
      return buffer;
    } catch (e) {
      console.log(e);
    } finally {
      await browser.close();
    }
  }

  addFilter(
    filters: FilterData,
    field: string,
    operator: string,
    value: string,
  ) {
    if (!filters.f) {
      filters.f = [{ field, operator, value }];
    } else {
      filters.f.push({ field, operator, value });
    }
    return filters;
  }

  async convertToVietnameseDay(day: string) {
    const reverseDayMap = new Map<string, string>([
      ['monday', 'thứ 2'],
      ['tuesday', 'thứ 3'],
      ['wednesday', 'thứ 4'],
      ['thursday', 'thứ 5'],
      ['friday', 'thứ 6'],
      ['saturday', 'thứ 7'],
      ['sunday', 'chủ nhật'],
    ]);
    return reverseDayMap.get(day.toLowerCase()) || null;
  }

  async generateSecureUrl({
    userId,
    originalUrlBase64,
    token,
    deviceId,
    timestamp,
  }: {
    userId: string;
    originalUrlBase64: string;
    token: string;
    deviceId: string;
    timestamp: string;
  }) {
    // Tạo timestamp (thời gian hiện tại tính bằng giây)
    // Dữ liệu cần hash

    const data = `${userId}_${deviceId}_${originalUrlBase64}_${timestamp}_${token}`;

    // Sử dụng module crypto có sẵn trong Node.js thay vì Web Crypto API
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256');
    hash.update(data);
    const hashHex = hash.digest('hex');
    const signature = hashHex;

    // URL cơ sở - endpoint xử lý truy cập tài nguyên
    const paramsString = `userId=${userId}&deviceId=${deviceId}&originalUrl=${originalUrlBase64}&timestamp=${timestamp}&signature=${signature}`;

    return { paramsString, signature };
  }
  /**
   * Tự động điều chỉnh độ rộng cột của bảng tính để phù hợp với giá trị dài nhất trong mỗi cột.
   * @param worksheet - Bảng tính để điều chỉnh chiều rộng cột
   */
  autoFitColumns(worksheet: any) {
    const MAX_COLUMN_WIDTH = 50;

    worksheet.columns.forEach((column: any) => {
      const maxLength =
        _.maxBy(column.values, (value: any) =>
          value ? value.toString().length : 0,
        )?.toString().length ?? 0;

      // Calculate width with min 4 and max 50 characters
      const calculatedWidth = Math.min(
        Math.max(maxLength + 1, 4),
        MAX_COLUMN_WIDTH,
      );

      column.width = calculatedWidth;

      column.eachCell({ includeEmpty: true }, (cell: any) => {
        cell.alignment = {
          ...cell.alignment,
          wrapText: true,
          vertical: 'middle',
          horizontal: 'left',
        };
      });
    });
  }

  async exportXlsxWithDataSuccessAndFail<T extends Record<string, unknown>>(
    dataSuccess: T[],
    dataFail: FailItem<T>[],
    data?: T[],
    headers?: string[],
    map?: Record<string, string>,
  ): Promise<ExcelJS.Buffer> {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('KET_QUA');

    const allData = data || [
      ...dataSuccess,
      ...dataFail.map((item) => item.data),
    ];

    if (_.isEmpty(allData)) {
      return workbook.xlsx.writeBuffer();
    }

    const columnDefinitions: ColumnDefinition[] = [
      { header: 'Kết quả', key: 'ket_qua', width: 15 },
      { header: 'Lỗi', key: 'loi', width: 15 },
      ...(headers || Object.keys(allData[0])).map((header) => ({
        header,
        key: header,
        width: 15,
      })),
    ];

    worksheet.columns = columnDefinitions;

    worksheet.getRow(1).font = { bold: true };

    const excludeFields = [
      'mat_khau', // mật khẩu NguoiDung
      'gioi_tinh', // giới tính NguoiDung
    ];

    allData.forEach((item) => {
      const mappedItem = _.mapKeys(item, (_, key) => map?.[key] || key);

      const convertedItem = _.mapValues(mappedItem, (value) => {
        if (typeof value !== 'string') return value;

        if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
          return moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD');
        }

        return value;
      });

      const convertedItemKeys = Object.keys(convertedItem).filter(
        (key) => !excludeFields.includes(key),
      );

      const inSuccessData = dataSuccess.some((successItem) => {
        const successItemKeys = Object.keys(successItem).filter(
          (key) => !excludeFields.includes(key),
        );

        const keysToCompare = convertedItemKeys.filter((key) =>
          successItemKeys.includes(key),
        );

        if (_.isEmpty(keysToCompare)) return false;

        const convertedSuccessItem = _.pick(successItem, keysToCompare);
        const filteredConvertedItem = _.pick(convertedItem, keysToCompare);

        const successItemStrings = _.mapValues(convertedSuccessItem, String);
        const convertedItemStrings = _.mapValues(filteredConvertedItem, String);

        return keysToCompare.every((key) =>
          _.isEqual(successItemStrings[key], convertedItemStrings[key]),
        );
      });

      const errorMessage = !inSuccessData
        ? dataFail
            .find((f) => _.isEqual(f.data, item))
            ?.message.split('||')[0] || ''
        : '';

      // Build row values
      const rowValues = [
        errorMessage === '' ? 'Thành công' : 'Thất bại',
        errorMessage,
        ...Object.values(item),
      ];

      const row = worksheet.addRow(rowValues);

      if (!inSuccessData) {
        row.eachCell((cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFE0E0' },
          };
        });
      }
    });

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    this.autoFitColumns(worksheet);

    return workbook.xlsx.writeBuffer();
  }

  transformMessage(rawMessage: string): string {
    const errorHandlers = {
      [DATABASE_GENERAL_ERROR.FOREIGN_KEY]: () => {
        const tableName = this.extractRegexPattern(
          rawMessage,
          /\.`(.*?)`/gm,
          0,
        )?.replace(/[.`]/g, '');
        if (tableName) {
          const translatedTableName =
            TABLE_NAMES_TRANSLATIONS[tableName] || tableName;
          return `${CORE_COMMON_ERROR.FOREIGN_KEY_EXCEPTION}: ${translatedTableName}`;
        }
        return `${CORE_COMMON_ERROR.FOREIGN_KEY_EXCEPTION}: `;
      },

      [DATABASE_GENERAL_ERROR.DUPLICATE_ENTRY]: () => {
        const matches = rawMessage.match(/'(.*?)'/gm);
        const firstMatch = _.first(
          matches?.filter((item) => !item.match(/IDX_/)),
        )?.replace(/'/g, '');
        return `${CORE_COMMON_ERROR.DUPLICATE_ENTRY}: ${firstMatch ?? ''}`;
      },

      [DATABASE_GENERAL_ERROR.DATA_TOO_LONG]: () => {
        const column = this.extractRegexPattern(rawMessage, /column '(.*?)'/);
        return `${CORE_COMMON_ERROR.DATA_TOO_LONG}: ${column}`;
      },

      [DATABASE_GENERAL_ERROR.NOT_NULL]: () => {
        const column = this.extractRegexPattern(rawMessage, /Column '(.*?)'/);
        return `${CORE_COMMON_ERROR.NOT_NULL}: ${column}`;
      },

      [DATABASE_GENERAL_ERROR.INVALID_DATETIME]: () => {
        const value = this.extractRegexPattern(rawMessage, /'(.*?)'/);
        return `${CORE_COMMON_ERROR.INVALID_DATETIME}: ${value}`;
      },

      [DATABASE_GENERAL_ERROR.ER_NO_REFERENCED_ROW_2]: () => {
        const tableName =
          this.extractRegexPattern(rawMessage, /`(.*?)`/gm, 0)?.replace(
            /`/g,
            '',
          ) || '';
        const translatedTableName =
          TABLE_NAMES_TRANSLATIONS[tableName] || tableName;
        return `Không thể thêm hoặc cập nhật bản ghi trong bảng ${translatedTableName}`;
      },

      [DATABASE_GENERAL_ERROR.ER_WARN_DATA_OUT_OF_RANGE]: () => {
        const column = this.extractRegexPattern(rawMessage, /column '(.*?)'/);
        return `${CORE_COMMON_ERROR.ER_WARN_DATA_OUT_OF_RANGE}: ${column}`;
      },

      ENOENT: () => CORE_COMMON_ERROR.ENOENT,
    };

    for (const [errorPattern, handler] of Object.entries(errorHandlers)) {
      if (rawMessage.includes(errorPattern)) {
        return handler();
      }
    }

    return rawMessage;
  }

  private extractRegexPattern(
    message: string,
    regex: RegExp,
    matchIndex = 1,
  ): string {
    const matches = message.match(regex);
    return matches?.[matchIndex] ?? '';
  }

  async convertBufferToFile(
    buffer: Buffer | ExcelJS.Buffer,
    filePath: string,
    fileName?: string,
  ): Promise<string> {
    try {
      const finalFileName =
        fileName?.replace(/\.xlsx$/, '') ||
        `export_${moment().format('YYYYMMDDHHmmss')}`;

      const sanitizedPath = _.trimEnd(filePath, path.sep);
      const finalPath =
        path.extname(sanitizedPath) === '.xlsx'
          ? sanitizedPath
          : path.join(sanitizedPath, `${finalFileName}.xlsx`);

      const workbook = new Workbook();
      await workbook.xlsx.load(buffer as ExcelJS.Buffer);

      await fs.mkdir(path.dirname(finalPath), { recursive: true });
      await workbook.xlsx.writeFile(finalPath);

      return finalPath;
    } catch (error) {
      console.error('File save error:', error);
      throw new HttpCoreException(
        CORE_COMMON_ERROR.UNKNOWN_ERROR,
        HTTP_CODE.INTERNAL_ERROR,
      );
    }
  }

  groupBy<T extends Record<string, any>>(
    array: T[],
    key: keyof T,
  ): Record<string, T[]> {
    return array.reduce((result, currentValue) => {
      const groupKey = String(currentValue[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(currentValue);
      return result;
    }, {} as Record<string, T[]>);
  }
}
