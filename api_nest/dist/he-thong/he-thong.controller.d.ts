import { UserReqData } from '@core/users/interfaces/user-req.interface';
import { CreateHeThongDto } from './dto/he-thong.dto';
import { HeThongService } from './he-thong.service';
export declare class HeThongController {
    private readonly heThongService;
    private readonly logger;
    constructor(heThongService: HeThongService);
    create(createHeThongDto: CreateHeThongDto, user: UserReqData): Promise<CreateHeThongDto & import("../database/entities/system/he-thong.entity").HeThong>;
    getLatestRecord(): Promise<import("../database/entities/system/he-thong.entity").HeThong>;
}
