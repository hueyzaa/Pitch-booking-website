/// <reference types="node" />
/// <reference types="node" />
import { FilterData } from '@database/interfaces/filter-data.interface';
import { JwtService } from '@nestjs/jwt';
import ExcelJS from 'exceljs';
import { FailItem } from './interfaces/helper.interface';
export declare class HelperService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    sleep(sec: number): Promise<unknown>;
    compareHashed(rawString: string, hashedString: string): Promise<boolean>;
    verifyJWTToken(token: string): Promise<any>;
    signJWTToken(payload: object, options?: object): Promise<string>;
    processXlsxToJson(filepath: string, row?: number, sheet?: number): Promise<any[]>;
    processXlsxToJsonVer2(filepath: string, expectedHeaders: string[][]): Promise<any>;
    validateColumns(headers: string[], expectedHeaders: string[]): string | null;
    genHashedPassword(pass: string): Promise<string>;
    private ones;
    private tens;
    private scales;
    convertNumberToWords(num: number): string;
    private convertNumberToWordsUnder1000;
    checkDate(startDate: Date, endDate: Date): boolean;
    replaceAll(str: string, searchValue: string, replaceValue: string): string;
    transformObject(obj: any): any;
    sumArray(arr: number[]): number;
    capitalizeFirstLetter(string: any): any;
    jsonToXlsx(data: Array<object>, headerConfig?: Array<object>): Promise<ExcelJS.Buffer>;
    exportPdfFromHbs(filePath: string, data?: object, options?: object): Promise<Buffer>;
    addFilter(filters: FilterData, field: string, operator: string, value: string): FilterData;
    convertToVietnameseDay(day: string): Promise<string>;
    generateSecureUrl({ userId, originalUrlBase64, token, deviceId, timestamp, }: {
        userId: string;
        originalUrlBase64: string;
        token: string;
        deviceId: string;
        timestamp: string;
    }): Promise<{
        paramsString: string;
        signature: any;
    }>;
    autoFitColumns(worksheet: any): void;
    exportXlsxWithDataSuccessAndFail<T extends Record<string, unknown>>(dataSuccess: T[], dataFail: FailItem<T>[], data?: T[], headers?: string[], map?: Record<string, string>): Promise<ExcelJS.Buffer>;
    transformMessage(rawMessage: string): string;
    private extractRegexPattern;
    convertBufferToFile(buffer: Buffer | ExcelJS.Buffer, filePath: string, fileName?: string): Promise<string>;
    groupBy<T extends Record<string, any>>(array: T[], key: keyof T): Record<string, T[]>;
}
