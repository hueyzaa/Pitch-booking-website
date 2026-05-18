import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuanLyUploadService } from 'src/quan-ly-upload/quan-ly-upload.service';
import { Repository } from 'typeorm';
import { CreateHeThongDto } from './dto/he-thong.dto';
import { HeThong } from '@database/entities/system/he-thong.entity';
@Injectable()
export class HeThongService {
  private readonly logger = new Logger(HeThongService.name);
  constructor(
    @InjectRepository(HeThong)
    private heThongRepo: Repository<HeThong>,

    private readonly quanLyUploadService: QuanLyUploadService,
  ) {}

  async create(createHeThongDto: CreateHeThongDto) {
    const latest = await this.getLatestRecord();
    if (latest?.logoUrl) {
      await this.quanLyUploadService.moveToOldFolder(latest.logoUrl);
    }

    return await this.heThongRepo.save(createHeThongDto);
  }

  async getLatestRecord(): Promise<HeThong | null> {
    try {
      const records = await this.heThongRepo.find({
        order: {
          ngay_tao: 'DESC',
        },
        take: 1,
      });

      return records[0] || null;
    } catch (error) {
      this.logger.error('Error fetching latest record', error);
      throw new Error('Error fetching latest record');
    }
  }
}
