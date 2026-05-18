import { TinhService } from './tinh.service';
export declare class TinhController {
    private readonly tinhService;
    constructor(tinhService: TinhService);
    findAllForSelectOptions(filters: any): Promise<import("../database/database.service").PaginationResult<any>>;
}
