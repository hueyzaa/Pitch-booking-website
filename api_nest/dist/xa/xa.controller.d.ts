import { XaService } from './xa.service';
export declare class XaController {
    private readonly xaService;
    constructor(xaService: XaService);
    findAllForSelectOptions(filters: any): Promise<import("../database/database.service").PaginationResult<any>>;
}
