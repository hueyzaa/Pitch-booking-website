"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperService = void 0;
const contanst_1 = require("../configs/contanst");
const core_exception_1 = require("../core/exceptions/core.exception");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const exceljs_1 = require("exceljs");
const fs_1 = require("fs");
const handlebars_1 = require("handlebars");
const moment = require("moment");
const path = require("path");
const puppeteer_1 = require("puppeteer");
const xlsx2json = require("xlsx2json");
const _ = require("lodash");
const translations_constant_1 = require("../configs/translations.constant");
const XLSX = require("xlsx");
let HelperService = class HelperService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.ones = [
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
        this.tens = [
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
        this.scales = ['', 'nghìn', 'triệu', 'tỷ'];
    }
    sleep(sec) {
        return new Promise((resolve) => setTimeout(resolve, sec * 1000));
    }
    async compareHashed(rawString, hashedString) {
        return await bcrypt.compare(rawString, hashedString);
    }
    async verifyJWTToken(token) {
        return this.jwtService.verify(token);
    }
    async signJWTToken(payload, options) {
        return this.jwtService.sign(payload, options);
    }
    async processXlsxToJson(filepath, row = 1, sheet = 0) {
        if (!filepath.endsWith('.xlsx')) {
            throw new core_exception_1.HttpCoreException('File không đúng định dạng. Chỉ hỗ trợ file .xlsx!', contanst_1.HTTP_CODE.UNPROCESSABLE_CONTENT);
        }
        try {
            const jsonArray = await xlsx2json(filepath);
            const sheetData = _.get(jsonArray, sheet, []);
            if (_.isEmpty(sheetData) || (row > 0 && sheetData.length <= row)) {
                throw new core_exception_1.HttpCoreException('File không có dữ liệu. Vui lòng kiểm tra lại!', contanst_1.HTTP_CODE.UNPROCESSABLE_CONTENT);
            }
            const rs = _(sheetData)
                .slice(row)
                .filter((element) => [element.A, element.B].some((field) => _.trim(field)))
                .value();
            if (_.isEmpty(rs)) {
                throw new core_exception_1.HttpCoreException('File không có dữ liệu. Vui lòng kiểm tra lại!', contanst_1.HTTP_CODE.UNPROCESSABLE_CONTENT);
            }
            return rs;
        }
        catch (error) {
            console.error('Error processing XLSX file:', error);
            throw error;
        }
    }
    async processXlsxToJsonVer2(filepath, expectedHeaders) {
        return new Promise((resolve, reject) => {
            const regex = /.+\.(xls|xlsx)$/i;
            if (!filepath.match(regex)) {
                return reject('Không phải là file Excel');
            }
            try {
                const workbook = XLSX.readFile(filepath);
                const sheetNames = workbook.SheetNames;
                if (sheetNames.length < expectedHeaders.length) {
                    return reject(`File Excel phải có ít nhất ${expectedHeaders.length} sheet`);
                }
                const sheets = [];
                for (let i = 0; i < expectedHeaders.length; i++) {
                    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[i]], { header: 1 });
                    const header = sheet[0];
                    const error = this.validateColumns(header, expectedHeaders[i]);
                    if (error) {
                        return reject(new core_exception_1.HttpCoreException(error, contanst_1.HTTP_CODE.BAD_REQUEST));
                    }
                    sheet.shift();
                    sheets.push(sheet);
                }
                const result = {};
                for (let i = 0; i < sheets.length; i++) {
                    result[`sheet${i + 1}`] = sheets[i];
                }
                resolve(result);
            }
            catch (error) {
                reject(error);
            }
            finally {
            }
        });
    }
    validateColumns(headers, expectedHeaders) {
        const normalizeString = (str) => str.replace(/\r\n|\r/g, '\n');
        const normalizedHeaders = headers.map((h) => normalizeString(h));
        const normalizedExpectedHeaders = expectedHeaders.map((h) => normalizeString(h));
        const isValid = normalizedHeaders.length === normalizedExpectedHeaders.length &&
            normalizedHeaders.every((header, index) => header === normalizedExpectedHeaders[index]);
        if (!isValid) {
            return 'Cấu trúc file không đúng, vui lòng sử dụng đúng mẫu Excel';
        }
        return null;
    }
    async genHashedPassword(pass) {
        const enbcrypt_pass = await bcrypt.hash(pass, 12);
        return enbcrypt_pass;
    }
    convertNumberToWords(num) {
        if (num === 0) {
            return 'không đồng';
        }
        else {
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
    convertNumberToWordsUnder1000(num) {
        if (num === 0) {
            return '';
        }
        else if (num < 10) {
            return this.ones[num];
        }
        else if (num < 20) {
            return 'mười ' + this.ones[num - 10];
        }
        else if (num < 100) {
            return (this.tens[Math.floor(num / 10)] +
                ' ' +
                this.convertNumberToWordsUnder1000(num % 10));
        }
        else if (num < 110) {
            return this.ones[Math.floor(num / 100)] + ' trăm mười';
        }
        else {
            return (this.ones[Math.floor(num / 100)] +
                ' trăm ' +
                this.convertNumberToWordsUnder1000(num % 100));
        }
    }
    checkDate(startDate, endDate) {
        return endDate > startDate;
    }
    replaceAll(str, searchValue, replaceValue) {
        return str.replace(new RegExp(searchValue, 'g'), replaceValue);
    }
    transformObject(obj) {
        const keys = Object.keys(obj);
        for (const key of keys) {
            if (typeof obj[key] === 'object') {
                const nestedObj = obj[key];
                if (nestedObj.hasOwnProperty('name')) {
                    obj[key] = nestedObj['name'];
                }
                else {
                    obj[key] = this.transformObject(nestedObj);
                }
            }
        }
        return obj;
    }
    sumArray(arr) {
        const result = arr.reduce((sumVal, nextVal) => sumVal + nextVal, 0);
        return result;
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    jsonToXlsx(data, headerConfig) {
        const workbook = new exceljs_1.Workbook();
        const worksheet = workbook.addWorksheet('EXPORT');
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
    async exportPdfFromHbs(filePath, data = {}, options = {}) {
        const browser = await puppeteer_1.default.launch();
        try {
            const page = await browser.newPage();
            const html = await (0, fs_1.readFileSync)(filePath, 'utf8');
            const template = handlebars_1.default.compile(html);
            const htmlContent = template(data);
            await page.setContent(htmlContent);
            const buffer = await page.pdf(Object.assign({ format: 'a4', printBackground: true, margin: {
                    left: '10mm',
                    top: '10mm',
                    right: '10mm',
                    bottom: '10mm',
                } }, options));
            await browser.close();
            return buffer;
        }
        catch (e) {
            console.log(e);
        }
        finally {
            await browser.close();
        }
    }
    addFilter(filters, field, operator, value) {
        if (!filters.f) {
            filters.f = [{ field, operator, value }];
        }
        else {
            filters.f.push({ field, operator, value });
        }
        return filters;
    }
    async convertToVietnameseDay(day) {
        const reverseDayMap = new Map([
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
    async generateSecureUrl({ userId, originalUrlBase64, token, deviceId, timestamp, }) {
        const data = `${userId}_${deviceId}_${originalUrlBase64}_${timestamp}_${token}`;
        const crypto = require('crypto');
        const hash = crypto.createHash('sha256');
        hash.update(data);
        const hashHex = hash.digest('hex');
        const signature = hashHex;
        const paramsString = `userId=${userId}&deviceId=${deviceId}&originalUrl=${originalUrlBase64}&timestamp=${timestamp}&signature=${signature}`;
        return { paramsString, signature };
    }
    autoFitColumns(worksheet) {
        const MAX_COLUMN_WIDTH = 50;
        worksheet.columns.forEach((column) => {
            var _a, _b;
            const maxLength = (_b = (_a = _.maxBy(column.values, (value) => value ? value.toString().length : 0)) === null || _a === void 0 ? void 0 : _a.toString().length) !== null && _b !== void 0 ? _b : 0;
            const calculatedWidth = Math.min(Math.max(maxLength + 1, 4), MAX_COLUMN_WIDTH);
            column.width = calculatedWidth;
            column.eachCell({ includeEmpty: true }, (cell) => {
                cell.alignment = Object.assign(Object.assign({}, cell.alignment), { wrapText: true, vertical: 'middle', horizontal: 'left' });
            });
        });
    }
    async exportXlsxWithDataSuccessAndFail(dataSuccess, dataFail, data, headers, map) {
        const workbook = new exceljs_1.Workbook();
        const worksheet = workbook.addWorksheet('KET_QUA');
        const allData = data || [
            ...dataSuccess,
            ...dataFail.map((item) => item.data),
        ];
        if (_.isEmpty(allData)) {
            return workbook.xlsx.writeBuffer();
        }
        const columnDefinitions = [
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
            'mat_khau',
            'gioi_tinh',
        ];
        allData.forEach((item) => {
            var _a;
            const mappedItem = _.mapKeys(item, (_, key) => (map === null || map === void 0 ? void 0 : map[key]) || key);
            const convertedItem = _.mapValues(mappedItem, (value) => {
                if (typeof value !== 'string')
                    return value;
                if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                    return moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD');
                }
                return value;
            });
            const convertedItemKeys = Object.keys(convertedItem).filter((key) => !excludeFields.includes(key));
            const inSuccessData = dataSuccess.some((successItem) => {
                const successItemKeys = Object.keys(successItem).filter((key) => !excludeFields.includes(key));
                const keysToCompare = convertedItemKeys.filter((key) => successItemKeys.includes(key));
                if (_.isEmpty(keysToCompare))
                    return false;
                const convertedSuccessItem = _.pick(successItem, keysToCompare);
                const filteredConvertedItem = _.pick(convertedItem, keysToCompare);
                const successItemStrings = _.mapValues(convertedSuccessItem, String);
                const convertedItemStrings = _.mapValues(filteredConvertedItem, String);
                return keysToCompare.every((key) => _.isEqual(successItemStrings[key], convertedItemStrings[key]));
            });
            const errorMessage = !inSuccessData
                ? ((_a = dataFail
                    .find((f) => _.isEqual(f.data, item))) === null || _a === void 0 ? void 0 : _a.message.split('||')[0]) || ''
                : '';
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
    transformMessage(rawMessage) {
        const errorHandlers = {
            [contanst_1.DATABASE_GENERAL_ERROR.FOREIGN_KEY]: () => {
                var _a;
                const tableName = (_a = this.extractRegexPattern(rawMessage, /\.`(.*?)`/gm, 0)) === null || _a === void 0 ? void 0 : _a.replace(/[.`]/g, '');
                if (tableName) {
                    const translatedTableName = translations_constant_1.TABLE_NAMES_TRANSLATIONS[tableName] || tableName;
                    return `${contanst_1.CORE_COMMON_ERROR.FOREIGN_KEY_EXCEPTION}: ${translatedTableName}`;
                }
                return `${contanst_1.CORE_COMMON_ERROR.FOREIGN_KEY_EXCEPTION}: `;
            },
            [contanst_1.DATABASE_GENERAL_ERROR.DUPLICATE_ENTRY]: () => {
                var _a;
                const matches = rawMessage.match(/'(.*?)'/gm);
                const firstMatch = (_a = _.first(matches === null || matches === void 0 ? void 0 : matches.filter((item) => !item.match(/IDX_/)))) === null || _a === void 0 ? void 0 : _a.replace(/'/g, '');
                return `${contanst_1.CORE_COMMON_ERROR.DUPLICATE_ENTRY}: ${firstMatch !== null && firstMatch !== void 0 ? firstMatch : ''}`;
            },
            [contanst_1.DATABASE_GENERAL_ERROR.DATA_TOO_LONG]: () => {
                const column = this.extractRegexPattern(rawMessage, /column '(.*?)'/);
                return `${contanst_1.CORE_COMMON_ERROR.DATA_TOO_LONG}: ${column}`;
            },
            [contanst_1.DATABASE_GENERAL_ERROR.NOT_NULL]: () => {
                const column = this.extractRegexPattern(rawMessage, /Column '(.*?)'/);
                return `${contanst_1.CORE_COMMON_ERROR.NOT_NULL}: ${column}`;
            },
            [contanst_1.DATABASE_GENERAL_ERROR.INVALID_DATETIME]: () => {
                const value = this.extractRegexPattern(rawMessage, /'(.*?)'/);
                return `${contanst_1.CORE_COMMON_ERROR.INVALID_DATETIME}: ${value}`;
            },
            [contanst_1.DATABASE_GENERAL_ERROR.ER_NO_REFERENCED_ROW_2]: () => {
                var _a;
                const tableName = ((_a = this.extractRegexPattern(rawMessage, /`(.*?)`/gm, 0)) === null || _a === void 0 ? void 0 : _a.replace(/`/g, '')) || '';
                const translatedTableName = translations_constant_1.TABLE_NAMES_TRANSLATIONS[tableName] || tableName;
                return `Không thể thêm hoặc cập nhật bản ghi trong bảng ${translatedTableName}`;
            },
            [contanst_1.DATABASE_GENERAL_ERROR.ER_WARN_DATA_OUT_OF_RANGE]: () => {
                const column = this.extractRegexPattern(rawMessage, /column '(.*?)'/);
                return `${contanst_1.CORE_COMMON_ERROR.ER_WARN_DATA_OUT_OF_RANGE}: ${column}`;
            },
            ENOENT: () => contanst_1.CORE_COMMON_ERROR.ENOENT,
        };
        for (const [errorPattern, handler] of Object.entries(errorHandlers)) {
            if (rawMessage.includes(errorPattern)) {
                return handler();
            }
        }
        return rawMessage;
    }
    extractRegexPattern(message, regex, matchIndex = 1) {
        var _a;
        const matches = message.match(regex);
        return (_a = matches === null || matches === void 0 ? void 0 : matches[matchIndex]) !== null && _a !== void 0 ? _a : '';
    }
    async convertBufferToFile(buffer, filePath, fileName) {
        try {
            const finalFileName = (fileName === null || fileName === void 0 ? void 0 : fileName.replace(/\.xlsx$/, '')) ||
                `export_${moment().format('YYYYMMDDHHmmss')}`;
            const sanitizedPath = _.trimEnd(filePath, path.sep);
            const finalPath = path.extname(sanitizedPath) === '.xlsx'
                ? sanitizedPath
                : path.join(sanitizedPath, `${finalFileName}.xlsx`);
            const workbook = new exceljs_1.Workbook();
            await workbook.xlsx.load(buffer);
            await fs_1.promises.mkdir(path.dirname(finalPath), { recursive: true });
            await workbook.xlsx.writeFile(finalPath);
            return finalPath;
        }
        catch (error) {
            console.error('File save error:', error);
            throw new core_exception_1.HttpCoreException(contanst_1.CORE_COMMON_ERROR.UNKNOWN_ERROR, contanst_1.HTTP_CODE.INTERNAL_ERROR);
        }
    }
    groupBy(array, key) {
        return array.reduce((result, currentValue) => {
            const groupKey = String(currentValue[key]);
            if (!result[groupKey]) {
                result[groupKey] = [];
            }
            result[groupKey].push(currentValue);
            return result;
        }, {});
    }
};
HelperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], HelperService);
exports.HelperService = HelperService;
//# sourceMappingURL=helper.service.js.map