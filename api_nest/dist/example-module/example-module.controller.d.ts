import { ExampleModuleService } from './example-module.service';
import { HelperService } from '@helper/helper.service';
export declare class ExampleModuleController {
    private readonly exampleModuleService;
    private readonly helperService;
    constructor(exampleModuleService: ExampleModuleService, helperService: HelperService);
    exportHbs(): Promise<{
        truong_du_lieu: string;
    }>;
    exportExcel(res: any): Promise<any>;
    exportPdf(res: any): Promise<any>;
}
