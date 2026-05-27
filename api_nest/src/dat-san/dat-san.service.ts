import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { FilterData } from 'src/database/interfaces/filter-data.interface';
import {
  DataSource,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { DatSan } from '../database/entities/dat-san.entity';
import { NguoiDung } from '../database/entities/auth/nguoi-dung.entity';
import { San } from '../database/entities/san.entity';

import { ThuChi } from '../database/entities/thu-chi.entity';
import { DoiTuong } from '../database/entities/doi-tuong.entity';
import { QuanLyGia } from '../database/entities/quan-ly-gia.entity';
import { TrangThaiSan } from '../database/entities/trang-thai-san.entity';
import { CreateDatSanDto, UpdateDatSanDto } from './dto/dat-san.dto';
import { HttpCoreException } from '@core/exceptions/core.exception';
import { HTTP_CODE } from '@configs/contanst';

@Injectable()
export class DatSanService {
  private readonly logger = new Logger(DatSanService.name);
  constructor(
    private readonly databaseService: DatabaseService,

    @InjectRepository(DatSan)
    private datSanRepo: Repository<DatSan>,

    @InjectRepository(ThuChi)
    private thuChiRepo: Repository<ThuChi>,

    @InjectRepository(DoiTuong)
    private doiTuongRepo: Repository<DoiTuong>,

    @InjectRepository(QuanLyGia)
    private quanLyGiaRepo: Repository<QuanLyGia>,

    @InjectRepository(TrangThaiSan)
    private trangThaiSanRepo: Repository<TrangThaiSan>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Kiểm tra xem thời gian đặt sân có trùng với khung giờ bảo trì không.
   * Nếu trùng, throw HttpCoreException với thông báo chi tiết.
   */
  private async validateMaintenance(
    id_san: number,
    ngay_dat: string,
    gio_bat_dau: string,
    gio_ket_thuc: string,
    id_dat_san?: number,
  ): Promise<void> {
    // Tìm các slot bảo trì (trang_thai = 2) của sân trong cùng ngày và có thời gian trùng
    const query = this.trangThaiSanRepo
      .createQueryBuilder('tts')
      .where('tts.id_san = :id_san', { id_san })
      .andWhere('tts.ngay = :ngay', { ngay: ngay_dat })
      .andWhere('tts.trang_thai = :trang_thai', { trang_thai: 2 }) // 2 = Bảo trì
      .andWhere('tts.gio_bat_dau < :gio_ket_thuc', { gio_ket_thuc })
      .andWhere('tts.gio_ket_thuc > :gio_bat_dau', { gio_bat_dau });

    // Nếu đang cập nhật booking, loại trừ slot trạng thái do chính booking đó tạo ra
    if (id_dat_san) {
      query.andWhere(
        '(tts.id_dat_san IS NULL OR tts.id_dat_san != :id_dat_san)',
        { id_dat_san },
      );
    }

    const maintenanceSlots = await query.getMany();

    if (maintenanceSlots.length > 0) {
      // Tạo thông báo chi tiết về các khung giờ bảo trì bị trùng
      const details = maintenanceSlots
        .map((slot) => `${slot.gio_bat_dau} - ${slot.gio_ket_thuc}`)
        .join(', ');

      throw new HttpCoreException(
        `Sân đang trong thời gian bảo trì (${details}). Không thể đặt sân trong khung giờ này!`,
        HTTP_CODE.BAD_REQUEST,
      );
    }
  }

  private async syncThuChi(bookingId: number, nguoi_cap_nhat: number) {
    const booking = await this.datSanRepo.findOneBy({ id: bookingId });
    if (!booking) return;

    if (booking.trang_thai === 1) {
      let thuChi = await this.thuChiRepo.findOneBy({ id_dat_san: booking.id });
      if (!thuChi) {
        thuChi = this.thuChiRepo.create({
          id_dat_san: booking.id,
          loai_giao_dich: 1, // 1 = Thu
          danh_muc: 'Thu tiền đặt sân',
          so_tien: booking.tong_tien,
          ngay_giao_dich: booking.ngay_dat,
          mo_ta: `Thu tiền đặt sân - ${booking.ma_dat_san}`,
          id_nguoi_dung: booking.id_nguoi_dung,
          id_san: booking.id_san,
          nguoi_tao: booking.nguoi_tao || nguoi_cap_nhat,
          nguoi_cap_nhat: nguoi_cap_nhat,
        });
      } else {
        thuChi.so_tien = booking.tong_tien;
        thuChi.ngay_giao_dich = booking.ngay_dat;
        thuChi.mo_ta = `Thu tiền đặt sân - ${booking.ma_dat_san}`;
        thuChi.id_nguoi_dung = booking.id_nguoi_dung;
        thuChi.id_san = booking.id_san;
        thuChi.nguoi_cap_nhat = nguoi_cap_nhat;
      }
      await this.thuChiRepo.save(thuChi);
    } else {
      await this.thuChiRepo.delete({ id_dat_san: booking.id });
    }
  }

  private async syncTrangThaiSan(bookingId: number, nguoi_cap_nhat: number) {
    const booking = await this.datSanRepo.findOne({
      where: { id: bookingId },
      relations: ['nguoi_dung'],
    });
    if (!booking) return;

    // trang_thai: 0: Chưa thanh toán, 1: Đã thanh toán, 2: Đã hủy
    if (booking.trang_thai === 0 || booking.trang_thai === 1) {
      let trangThaiSan = await this.trangThaiSanRepo.findOneBy({
        id_dat_san: booking.id,
      });
      const tenKhachHang = booking.nguoi_dung
        ? booking.nguoi_dung.ho_va_ten
        : 'Khách hàng';
      const ghiChu = booking.ghi_chu
        ? booking.ghi_chu
        : `Đặt sân - ${tenKhachHang} (${booking.ma_dat_san})`;

      if (!trangThaiSan) {
        trangThaiSan = this.trangThaiSanRepo.create({
          id_dat_san: booking.id,
          id_san: booking.id_san,
          ngay: booking.ngay_dat,
          gio_bat_dau: booking.gio_bat_dau,
          gio_ket_thuc: booking.gio_ket_thuc,
          trang_thai: 1, // 1 = Đã đặt
          ghi_chu: ghiChu,
          nguoi_tao: booking.nguoi_tao || nguoi_cap_nhat,
          nguoi_cap_nhat: nguoi_cap_nhat,
        });
      } else {
        trangThaiSan.id_san = booking.id_san;
        trangThaiSan.ngay = booking.ngay_dat;
        trangThaiSan.gio_bat_dau = booking.gio_bat_dau;
        trangThaiSan.gio_ket_thuc = booking.gio_ket_thuc;
        trangThaiSan.ghi_chu = ghiChu;
        trangThaiSan.nguoi_cap_nhat = nguoi_cap_nhat;
      }
      await this.trangThaiSanRepo.save(trangThaiSan);
    } else {
      // If status is 2 (Đã hủy), release the slot by deleting the status record
      await this.trangThaiSanRepo.delete({ id_dat_san: booking.id });
    }
  }

  private async calculateBookingAmount(
    dto: CreateDatSanDto | UpdateDatSanDto,
    existingBooking?: DatSan,
  ): Promise<{
    id_doi_tuong: number | null;
    tong_tien: number;
    phan_tram_giam_gia: number;
  }> {
    const id_san = dto.id_san ?? existingBooking?.id_san;
    const id_nguoi_dung = dto.id_nguoi_dung ?? existingBooking?.id_nguoi_dung;
    const gio_bat_dau = dto.gio_bat_dau ?? existingBooking?.gio_bat_dau;
    const gio_ket_thuc = dto.gio_ket_thuc ?? existingBooking?.gio_ket_thuc;

    if (!id_san || !id_nguoi_dung || !gio_bat_dau || !gio_ket_thuc) {
      return {
        id_doi_tuong: dto.id_doi_tuong ?? existingBooking?.id_doi_tuong ?? null,
        tong_tien: dto.tong_tien ?? existingBooking?.tong_tien ?? 0,
        phan_tram_giam_gia:
          dto.phan_tram_giam_gia ?? existingBooking?.phan_tram_giam_gia ?? 0,
      };
    }

    // 1. Fetch pitch's base rate
    const priceRule = await this.quanLyGiaRepo.findOne({
      where: { id_san, trang_thai: 1 },
      order: { id: 'DESC' },
    });
    const giaTheoGio = priceRule ? Number(priceRule.gia_theo_gio) : 0;

    // 2. Fetch customer to resolve group and discount percentage
    let id_doi_tuong = dto.id_doi_tuong;
    let phanTramGiamGia = dto.phan_tram_giam_gia;

    // Look up customer to get their group
    const nguoiDung = await this.dataSource.getRepository(NguoiDung).findOne({
      where: { id: id_nguoi_dung },
      relations: ['doi_tuong'],
    });

    if (nguoiDung) {
      if (!id_doi_tuong) {
        id_doi_tuong = nguoiDung.id_doi_tuong;
      }
      if (phanTramGiamGia === undefined || phanTramGiamGia === null) {
        phanTramGiamGia = nguoiDung.doi_tuong
          ? nguoiDung.doi_tuong.phan_tram_giam_gia
          : 0;
      }
    } else {
      if (!id_doi_tuong) {
        id_doi_tuong = existingBooking?.id_doi_tuong ?? null;
      }
      if (phanTramGiamGia === undefined || phanTramGiamGia === null) {
        phanTramGiamGia = existingBooking?.phan_tram_giam_gia ?? 0;
      }
    }

    // 3. Calculate duration in hours and peak hour adjustment
    const [hStart, mStart] = gio_bat_dau.split(':').map(Number);
    const [hEnd, mEnd] = gio_ket_thuc.split(':').map(Number);
    const durationHours = (hEnd * 60 + mEnd - (hStart * 60 + mStart)) / 60;

    if (durationHours <= 0) {
      return {
        id_doi_tuong,
        tong_tien: 0,
        phan_tram_giam_gia: phanTramGiamGia,
      };
    }

    // Peak hours pricing (17:00 - 20:00) with 1.2x multiplier, calculated hour by hour
    let totalBasePrice = 0;
    const startHour = hStart;
    const endHour = hEnd;

    for (let hour = startHour; hour < endHour; hour++) {
      const isPeak = hour >= 17 && hour < 20;
      const hourPrice = isPeak
        ? Math.round((giaTheoGio * 1.2) / 10000) * 10000
        : giaTheoGio;
      totalBasePrice += hourPrice;
    }

    // Apply customer discount if any
    const donGia = totalBasePrice * (1 - phanTramGiamGia / 100);
    const tong_tien = Math.round(donGia);

    return { id_doi_tuong, tong_tien, phan_tram_giam_gia: phanTramGiamGia };
  }

  async create(createDatSanDto: CreateDatSanDto) {
    // Kiểm tra sân có đang bảo trì không trước khi tạo đặt sân
    await this.validateMaintenance(
      createDatSanDto.id_san,
      createDatSanDto.ngay_dat,
      createDatSanDto.gio_bat_dau,
      createDatSanDto.gio_ket_thuc,
    );

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}${mm}${dd}`;
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4 random digits
    const ma_dat_san = `DS${dateStr}${randomDigits}`;

    const { id_doi_tuong, tong_tien, phan_tram_giam_gia } =
      await this.calculateBookingAmount(createDatSanDto);

    const dataToSave = {
      ...createDatSanDto,
      ma_dat_san,
      id_doi_tuong,
      tong_tien,
      phan_tram_giam_gia,
    };
    const savedBooking = await this.datSanRepo.save(dataToSave);
    await this.syncThuChi(savedBooking.id, savedBooking.nguoi_tao);
    await this.syncTrangThaiSan(savedBooking.id, savedBooking.nguoi_tao);
    return savedBooking;
  }

  /**
   * Public: Lấy danh sách khung giờ đã đặt / bảo trì của 1 sân trong 1 ngày.
   * Trả về mảng các slot { gio_bat_dau, gio_ket_thuc, trang_thai }.
   */
  async findBookedSlots(id_san: number, ngay: string) {
    const slots = await this.trangThaiSanRepo.find({
      where: { id_san, ngay },
      select: ['gio_bat_dau', 'gio_ket_thuc', 'trang_thai'],
    });
    return slots;
  }

  /**
   * Public: Tạo đặt sân từ website công khai.
   * Tìm KhachHang bằng tai_khoan, tạo booking, sync trạng thái sân.
   */
  async publicCreate(data: {
    tai_khoan: string;
    id_san: number;
    ngay_dat: string;
    gio_bat_dau: string;
    gio_ket_thuc: string;
    tong_tien: number;
    ghi_chu?: string;
  }) {
    // 1. Tìm NguoiDung theo tai_khoan
    const nguoiDungRepo = this.dataSource.getRepository(NguoiDung);
    const nguoiDung = await nguoiDungRepo.findOne({
      where: { tai_khoan: data.tai_khoan },
    });
    if (!nguoiDung) {
      throw new HttpCoreException(
        'Không tìm thấy thông tin khách hàng. Vui lòng đăng nhập lại.',
        HTTP_CODE.BAD_REQUEST,
      );
    }

    // 2. Kiểm tra bảo trì
    await this.validateMaintenance(
      data.id_san,
      data.ngay_dat,
      data.gio_bat_dau,
      data.gio_ket_thuc,
    );

    // 3. Kiểm tra trùng lịch (slot đã có người đặt)
    const existingSlot = await this.trangThaiSanRepo
      .createQueryBuilder('tts')
      .where('tts.id_san = :id_san', { id_san: data.id_san })
      .andWhere('tts.ngay = :ngay', { ngay: data.ngay_dat })
      .andWhere('tts.trang_thai IN (:...statuses)', { statuses: [1, 2] })
      .andWhere('tts.gio_bat_dau < :gio_ket_thuc', {
        gio_ket_thuc: data.gio_ket_thuc,
      })
      .andWhere('tts.gio_ket_thuc > :gio_bat_dau', {
        gio_bat_dau: data.gio_bat_dau,
      })
      .getOne();

    if (existingSlot) {
      throw new HttpCoreException(
        `Khung giờ ${data.gio_bat_dau} - ${data.gio_ket_thuc} đã có người đặt hoặc đang bảo trì.`,
        HTTP_CODE.BAD_REQUEST,
      );
    }

    // 4. Tạo mã đặt sân
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}${mm}${dd}`;
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const ma_dat_san = `DS${dateStr}${randomDigits}`;

    // 5. Tính giá
    const createDto: CreateDatSanDto = {
      id_nguoi_dung: nguoiDung.id,
      id_san: data.id_san,
      ngay_dat: data.ngay_dat,
      gio_bat_dau: data.gio_bat_dau,
      gio_ket_thuc: data.gio_ket_thuc,
      tong_tien: data.tong_tien,
      trang_thai: 0, // Chưa thanh toán
      ghi_chu: data.ghi_chu || `Đặt sân online - ${nguoiDung.ho_va_ten}`,
    };

    const { id_doi_tuong, tong_tien, phan_tram_giam_gia } =
      await this.calculateBookingAmount(createDto);

    const dataToSave = {
      ...createDto,
      ma_dat_san,
      id_doi_tuong,
      tong_tien: tong_tien || data.tong_tien,
      phan_tram_giam_gia,
      nguoi_tao: nguoiDung.nguoi_tao || 0,
      nguoi_cap_nhat: nguoiDung.nguoi_cap_nhat || 0,
    };

    const savedBooking = await this.datSanRepo.save(dataToSave);
    await this.syncThuChi(savedBooking.id, savedBooking.nguoi_tao);
    await this.syncTrangThaiSan(savedBooking.id, savedBooking.nguoi_tao);
    return savedBooking;
  }

  /**
   * Public: Lấy lịch sử đặt sân của 1 khách hàng (theo tai_khoan).
   */
  async findByTaiKhoan(tai_khoan: string) {
    const nguoiDungRepo = this.dataSource.getRepository(NguoiDung);
    const nguoiDung = await nguoiDungRepo.findOne({
      where: { tai_khoan },
    });
    if (!nguoiDung) {
      return [];
    }

    const bookings = await this.datSanRepo.find({
      where: { id_nguoi_dung: nguoiDung.id },
      relations: ['san', 'doi_tuong'],
      order: { ngay_dat: 'DESC', gio_bat_dau: 'DESC' },
    });
    return bookings;
  }

  findAllWithPagination(filters: FilterData) {
    return this.databaseService.findWithPagination(
      filters,
      this.datSanRepo
        .createQueryBuilder('dat_san')
        .leftJoin(NguoiDung, 'nguoi_tao', 'nguoi_tao.id = dat_san.nguoi_tao')
        .leftJoin(
          NguoiDung,
          'nguoi_cap_nhat',
          'nguoi_cap_nhat.id = dat_san.nguoi_cap_nhat',
        )
        .leftJoin(
          NguoiDung,
          'nguoi_dung',
          'nguoi_dung.id = dat_san.id_nguoi_dung',
        )
        .leftJoin(San, 'san', 'san.id = dat_san.id_san')
        .leftJoin(DoiTuong, 'doi_tuong', 'doi_tuong.id = dat_san.id_doi_tuong'),
      [
        'dat_san.id as id',
        'dat_san.ma_dat_san as ma_dat_san',
        'dat_san.id_nguoi_dung as id_nguoi_dung',
        'nguoi_dung.ho_va_ten as ten_khach_hang',
        'nguoi_dung.so_dien_thoai as so_dien_thoai_khach_hang',
        'dat_san.id_san as id_san',
        'san.ten_san as ten_san',
        'dat_san.id_doi_tuong as id_doi_tuong',
        'doi_tuong.ten_doi_tuong as ten_doi_tuong',
        'dat_san.phan_tram_giam_gia as phan_tram_giam_gia',
        'dat_san.ngay_dat as ngay_dat',
        'dat_san.gio_bat_dau as gio_bat_dau',
        'dat_san.gio_ket_thuc as gio_ket_thuc',
        'dat_san.tong_tien as tong_tien',
        'dat_san.trang_thai as trang_thai',
        'dat_san.ghi_chu as ghi_chu',
        'dat_san.ngay_tao as ngay_tao',
        'nguoi_tao.ho_va_ten as ten_nguoi_tao',
        'dat_san.ngay_cap_nhat as ngay_cap_nhat',
        'nguoi_cap_nhat.ho_va_ten as ten_nguoi_cap_nhat',
      ], // Colums need select
      [], // Columns Overwrite
    );
  }

  findAll(options?: FindManyOptions<DatSan>) {
    return this.datSanRepo.find(options);
  }

  findOneById(id: number) {
    return this.datSanRepo.findOne({
      where: { id },
      relations: ['nguoi_dung', 'san', 'doi_tuong'],
    });
  }

  findOneBy(where: FindOptionsWhere<DatSan> | FindOptionsWhere<DatSan>[]) {
    return this.datSanRepo.findOneBy(where);
  }

  async update(id: number, updateDatSanDto: UpdateDatSanDto) {
    const existing = await this.datSanRepo.findOneBy({ id });
    if (existing) {
      // Kiểm tra sân có đang bảo trì không trước khi cập nhật đặt sân
      const finalIdSan = updateDatSanDto.id_san ?? existing.id_san;
      const finalNgayDat = updateDatSanDto.ngay_dat ?? existing.ngay_dat;
      const finalGioBatDau =
        updateDatSanDto.gio_bat_dau ?? existing.gio_bat_dau;
      const finalGioKetThuc =
        updateDatSanDto.gio_ket_thuc ?? existing.gio_ket_thuc;

      await this.validateMaintenance(
        finalIdSan,
        finalNgayDat,
        finalGioBatDau,
        finalGioKetThuc,
        id, // Truyền id_dat_san để loại trừ slot do chính booking này tạo ra
      );

      const { id_doi_tuong, tong_tien, phan_tram_giam_gia } =
        await this.calculateBookingAmount(updateDatSanDto, existing);
      await this.datSanRepo.update(id, {
        ...updateDatSanDto,
        id_doi_tuong,
        tong_tien,
        phan_tram_giam_gia,
      });
    } else {
      await this.datSanRepo.update(id, updateDatSanDto);
    }
    await this.syncThuChi(id, updateDatSanDto.nguoi_cap_nhat || 1);
    await this.syncTrangThaiSan(id, updateDatSanDto.nguoi_cap_nhat || 1);
    return await this.findOneById(id);
  }

  async remove(id: number) {
    await this.thuChiRepo.delete({ id_dat_san: id });
    await this.trangThaiSanRepo.delete({ id_dat_san: id });
    return this.deleteBy({ id });
  }

  removeBy(where: FindOptionsWhere<DatSan>) {
    return this.datSanRepo.update(where, {});
  }

  async deleteBy(where: FindOptionsWhere<DatSan>) {
    const bookings = await this.datSanRepo.find({ where });
    for (const booking of bookings) {
      await this.thuChiRepo.delete({ id_dat_san: booking.id });
      await this.trangThaiSanRepo.delete({ id_dat_san: booking.id });
    }
    return this.datSanRepo.delete(where);
  }

  async findForSelectOptions(filters: FilterData) {
    filters.limit = -1; // Get all

    return this.databaseService.findWithPagination(
      filters,
      this.datSanRepo
        .createQueryBuilder('dat_san')
        .leftJoin(
          NguoiDung,
          'nguoi_dung',
          'nguoi_dung.id = dat_san.id_nguoi_dung',
        )
        .leftJoin(San, 'san', 'san.id = dat_san.id_san'),
      [
        'dat_san.id as value',
        `CONCAT(nguoi_dung.ho_va_ten, ' - ', san.ten_san, ' (', dat_san.ngay_dat, ')') as label`,
      ], // Colums need select
      [], // Columns Overwrite
    );
  }
}
