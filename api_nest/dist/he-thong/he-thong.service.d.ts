import { QuanLyUploadService } from 'src/quan-ly-upload/quan-ly-upload.service';
import { Repository } from 'typeorm';
import { CreateHeThongDto } from './dto/he-thong.dto';
import { HeThong } from '@database/entities/system/he-thong.entity';
export declare class HeThongService {
    private heThongRepo;
    private readonly quanLyUploadService;
    private readonly logger;
    constructor(heThongRepo: Repository<HeThong>, quanLyUploadService: QuanLyUploadService);
    create(createHeThongDto: CreateHeThongDto): Promise<CreateHeThongDto & HeThong>;
    getLatestRecord(): Promise<HeThong | null>;
}
