/// <reference types="multer" />
import { HelperService } from '@helper/helper.service';
import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { FilterData } from '@database/interfaces/filter-data.interface';
import { CreateSanDto, UpdateSanDto } from './dto/san.dto';
import { SanService } from './san.service';
export declare class SanController {
    private readonly sanService;
    private readonly helperService;
    private readonly logger;
    constructor(sanService: SanService, helperService: HelperService);
    private fileToBase64;
    create(createSanDto: CreateSanDto, user: UserReqData, files: {
        anh_chinh?: Express.Multer.File[];
        anh_chi_tiet?: Express.Multer.File[];
    }): Promise<CreateSanDto & import("../database/entities/san.entity").San>;
    exportExcel(filters: FilterData, res: any): Promise<any>;
    findAllForSelectOptions(filters: any): Promise<import("../database/database.service").PaginationResult<any>>;
    findAll(filters: FilterData): Promise<import("../database/database.service").PaginationResult<any>>;
    findOne(id: string): Promise<any>;
    update(id: string, updateSanDto: UpdateSanDto, user: UserReqData, files: {
        anh_chinh?: Express.Multer.File[];
        anh_chi_tiet?: Express.Multer.File[];
    }): Promise<any>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
