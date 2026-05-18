import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { HelperService } from '@helper/helper.service';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private readonly httpAdapterHost;
    private readonly helperService;
    private readonly logger;
    constructor(httpAdapterHost: HttpAdapterHost, helperService: HelperService);
    catch(exception: any, host: ArgumentsHost): void;
}
