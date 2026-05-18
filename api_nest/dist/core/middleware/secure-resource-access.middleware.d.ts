/// <reference types="cookie-parser" />
import { UserService } from '@core/profile/profile.service';
import { NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { HelperService } from '../../helper/helper.service';
import { NguoiDungThietBi } from '@database/entities/auth/nguoi-dung-thiet-bi.entity';
import { Log } from '@database/entities/system/log.entity';
export declare class SecureResourceAccessMiddleware implements NestMiddleware {
    private readonly userService;
    private readonly helperService;
    private readonly configService;
    private readonly nguoiDungThietBiRepository;
    private readonly logRepository;
    constructor(userService: UserService, helperService: HelperService, configService: ConfigService, nguoiDungThietBiRepository: Repository<NguoiDungThietBi>, logRepository: Repository<Log>);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
