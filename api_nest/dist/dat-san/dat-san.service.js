"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DatSanService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatSanService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_service_1 = require("../database/database.service");
const typeorm_2 = require("typeorm");
const dat_san_entity_1 = require("../database/entities/dat-san.entity");
const nguoi_dung_entity_1 = require("../database/entities/auth/nguoi-dung.entity");
const san_entity_1 = require("../database/entities/san.entity");
const khach_hang_entity_1 = require("../database/entities/khach-hang.entity");
const thu_chi_entity_1 = require("../database/entities/thu-chi.entity");
const doi_tuong_entity_1 = require("../database/entities/doi-tuong.entity");
const quan_ly_gia_entity_1 = require("../database/entities/quan-ly-gia.entity");
const trang_thai_san_entity_1 = require("../database/entities/trang-thai-san.entity");
const core_exception_1 = require("../core/exceptions/core.exception");
const contanst_1 = require("../configs/contanst");
let DatSanService = DatSanService_1 = class DatSanService {
    constructor(databaseService, datSanRepo, thuChiRepo, doiTuongRepo, quanLyGiaRepo, trangThaiSanRepo, cacheManager, dataSource) {
        this.databaseService = databaseService;
        this.datSanRepo = datSanRepo;
        this.thuChiRepo = thuChiRepo;
        this.doiTuongRepo = doiTuongRepo;
        this.quanLyGiaRepo = quanLyGiaRepo;
        this.trangThaiSanRepo = trangThaiSanRepo;
        this.cacheManager = cacheManager;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(DatSanService_1.name);
    }
    async validateMaintenance(id_san, ngay_dat, gio_bat_dau, gio_ket_thuc, id_dat_san) {
        const query = this.trangThaiSanRepo
            .createQueryBuilder('tts')
            .where('tts.id_san = :id_san', { id_san })
            .andWhere('tts.ngay = :ngay', { ngay: ngay_dat })
            .andWhere('tts.trang_thai = :trang_thai', { trang_thai: 2 })
            .andWhere('tts.gio_bat_dau < :gio_ket_thuc', { gio_ket_thuc })
            .andWhere('tts.gio_ket_thuc > :gio_bat_dau', { gio_bat_dau });
        if (id_dat_san) {
            query.andWhere('(tts.id_dat_san IS NULL OR tts.id_dat_san != :id_dat_san)', { id_dat_san });
        }
        const maintenanceSlots = await query.getMany();
        if (maintenanceSlots.length > 0) {
            const details = maintenanceSlots
                .map((slot) => `${slot.gio_bat_dau} - ${slot.gio_ket_thuc}`)
                .join(', ');
            throw new core_exception_1.HttpCoreException(`Sân đang trong thời gian bảo trì (${details}). Không thể đặt sân trong khung giờ này!`, contanst_1.HTTP_CODE.BAD_REQUEST);
        }
    }
    async syncThuChi(bookingId, nguoi_cap_nhat) {
        const booking = await this.datSanRepo.findOneBy({ id: bookingId });
        if (!booking)
            return;
        if (booking.trang_thai === 1) {
            let thuChi = await this.thuChiRepo.findOneBy({ id_dat_san: booking.id });
            if (!thuChi) {
                thuChi = this.thuChiRepo.create({
                    id_dat_san: booking.id,
                    loai_giao_dich: 1,
                    danh_muc: 'Thu tiền đặt sân',
                    so_tien: booking.tong_tien,
                    ngay_giao_dich: booking.ngay_dat,
                    mo_ta: `Thu tiền đặt sân - ${booking.ma_dat_san}`,
                    id_khach_hang: booking.id_khach_hang,
                    id_san: booking.id_san,
                    nguoi_tao: booking.nguoi_tao || nguoi_cap_nhat,
                    nguoi_cap_nhat: nguoi_cap_nhat,
                });
            }
            else {
                thuChi.so_tien = booking.tong_tien;
                thuChi.ngay_giao_dich = booking.ngay_dat;
                thuChi.mo_ta = `Thu tiền đặt sân - ${booking.ma_dat_san}`;
                thuChi.id_khach_hang = booking.id_khach_hang;
                thuChi.id_san = booking.id_san;
                thuChi.nguoi_cap_nhat = nguoi_cap_nhat;
            }
            await this.thuChiRepo.save(thuChi);
        }
        else {
            await this.thuChiRepo.delete({ id_dat_san: booking.id });
        }
    }
    async syncTrangThaiSan(bookingId, nguoi_cap_nhat) {
        const booking = await this.datSanRepo.findOne({
            where: { id: bookingId },
            relations: ['khach_hang'],
        });
        if (!booking)
            return;
        if (booking.trang_thai === 0 || booking.trang_thai === 1) {
            let trangThaiSan = await this.trangThaiSanRepo.findOneBy({
                id_dat_san: booking.id,
            });
            const tenKhachHang = booking.khach_hang
                ? booking.khach_hang.ho_va_ten
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
                    trang_thai: 1,
                    ghi_chu: ghiChu,
                    nguoi_tao: booking.nguoi_tao || nguoi_cap_nhat,
                    nguoi_cap_nhat: nguoi_cap_nhat,
                });
            }
            else {
                trangThaiSan.id_san = booking.id_san;
                trangThaiSan.ngay = booking.ngay_dat;
                trangThaiSan.gio_bat_dau = booking.gio_bat_dau;
                trangThaiSan.gio_ket_thuc = booking.gio_ket_thuc;
                trangThaiSan.ghi_chu = ghiChu;
                trangThaiSan.nguoi_cap_nhat = nguoi_cap_nhat;
            }
            await this.trangThaiSanRepo.save(trangThaiSan);
        }
        else {
            await this.trangThaiSanRepo.delete({ id_dat_san: booking.id });
        }
    }
    async calculateBookingAmount(dto, existingBooking) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const id_san = (_a = dto.id_san) !== null && _a !== void 0 ? _a : existingBooking === null || existingBooking === void 0 ? void 0 : existingBooking.id_san;
        const id_khach_hang = (_b = dto.id_khach_hang) !== null && _b !== void 0 ? _b : existingBooking === null || existingBooking === void 0 ? void 0 : existingBooking.id_khach_hang;
        const gio_bat_dau = (_c = dto.gio_bat_dau) !== null && _c !== void 0 ? _c : existingBooking === null || existingBooking === void 0 ? void 0 : existingBooking.gio_bat_dau;
        const gio_ket_thuc = (_d = dto.gio_ket_thuc) !== null && _d !== void 0 ? _d : existingBooking === null || existingBooking === void 0 ? void 0 : existingBooking.gio_ket_thuc;
        if (!id_san || !id_khach_hang || !gio_bat_dau || !gio_ket_thuc) {
            return {
                id_doi_tuong: (_f = (_e = dto.id_doi_tuong) !== null && _e !== void 0 ? _e : existingBooking === null || existingBooking === void 0 ? void 0 : existingBooking.id_doi_tuong) !== null && _f !== void 0 ? _f : null,
                tong_tien: (_h = (_g = dto.tong_tien) !== null && _g !== void 0 ? _g : existingBooking === null || existingBooking === void 0 ? void 0 : existingBooking.tong_tien) !== null && _h !== void 0 ? _h : 0,
                phan_tram_giam_gia: (_k = (_j = dto.phan_tram_giam_gia) !== null && _j !== void 0 ? _j : existingBooking === null || existingBooking === void 0 ? void 0 : existingBooking.phan_tram_giam_gia) !== null && _k !== void 0 ? _k : 0,
            };
        }
        const priceRule = await this.quanLyGiaRepo.findOne({
            where: { id_san, trang_thai: 1 },
            order: { id: 'DESC' },
        });
        const giaTheoGio = priceRule ? Number(priceRule.gia_theo_gio) : 0;
        let id_doi_tuong = dto.id_doi_tuong;
        let phanTramGiamGia = dto.phan_tram_giam_gia;
        const khachHang = await this.dataSource.getRepository(khach_hang_entity_1.KhachHang).findOne({
            where: { id: id_khach_hang },
            relations: ['doi_tuong'],
        });
        if (khachHang) {
            if (!id_doi_tuong) {
                id_doi_tuong = khachHang.id_doi_tuong;
            }
            if (phanTramGiamGia === undefined || phanTramGiamGia === null) {
                phanTramGiamGia = khachHang.doi_tuong
                    ? khachHang.doi_tuong.phan_tram_giam_gia
                    : 0;
            }
        }
        else {
            if (!id_doi_tuong) {
                id_doi_tuong = (_l = existingBooking === null || existingBooking === void 0 ? void 0 : existingBooking.id_doi_tuong) !== null && _l !== void 0 ? _l : null;
            }
            if (phanTramGiamGia === undefined || phanTramGiamGia === null) {
                phanTramGiamGia = (_m = existingBooking === null || existingBooking === void 0 ? void 0 : existingBooking.phan_tram_giam_gia) !== null && _m !== void 0 ? _m : 0;
            }
        }
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
        const donGia = totalBasePrice * (1 - phanTramGiamGia / 100);
        const tong_tien = Math.round(donGia);
        return { id_doi_tuong, tong_tien, phan_tram_giam_gia: phanTramGiamGia };
    }
    async create(createDatSanDto) {
        await this.validateMaintenance(createDatSanDto.id_san, createDatSanDto.ngay_dat, createDatSanDto.gio_bat_dau, createDatSanDto.gio_ket_thuc);
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}${mm}${dd}`;
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const ma_dat_san = `DS${dateStr}${randomDigits}`;
        const { id_doi_tuong, tong_tien, phan_tram_giam_gia } = await this.calculateBookingAmount(createDatSanDto);
        const dataToSave = Object.assign(Object.assign({}, createDatSanDto), { ma_dat_san,
            id_doi_tuong,
            tong_tien,
            phan_tram_giam_gia });
        const savedBooking = await this.datSanRepo.save(dataToSave);
        await this.syncThuChi(savedBooking.id, savedBooking.nguoi_tao);
        await this.syncTrangThaiSan(savedBooking.id, savedBooking.nguoi_tao);
        return savedBooking;
    }
    async findBookedSlots(id_san, ngay) {
        const slots = await this.trangThaiSanRepo.find({
            where: { id_san, ngay },
            select: ['gio_bat_dau', 'gio_ket_thuc', 'trang_thai'],
        });
        return slots;
    }
    async publicCreate(data) {
        const khachHangRepo = this.dataSource.getRepository(khach_hang_entity_1.KhachHang);
        const khachHang = await khachHangRepo.findOne({
            where: { tai_khoan: data.tai_khoan },
        });
        if (!khachHang) {
            throw new core_exception_1.HttpCoreException('Không tìm thấy thông tin khách hàng. Vui lòng đăng nhập lại.', contanst_1.HTTP_CODE.BAD_REQUEST);
        }
        await this.validateMaintenance(data.id_san, data.ngay_dat, data.gio_bat_dau, data.gio_ket_thuc);
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
            throw new core_exception_1.HttpCoreException(`Khung giờ ${data.gio_bat_dau} - ${data.gio_ket_thuc} đã có người đặt hoặc đang bảo trì.`, contanst_1.HTTP_CODE.BAD_REQUEST);
        }
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}${mm}${dd}`;
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const ma_dat_san = `DS${dateStr}${randomDigits}`;
        const createDto = {
            id_khach_hang: khachHang.id,
            id_san: data.id_san,
            ngay_dat: data.ngay_dat,
            gio_bat_dau: data.gio_bat_dau,
            gio_ket_thuc: data.gio_ket_thuc,
            tong_tien: data.tong_tien,
            trang_thai: 0,
            ghi_chu: data.ghi_chu || `Đặt sân online - ${khachHang.ho_va_ten}`,
        };
        const { id_doi_tuong, tong_tien, phan_tram_giam_gia } = await this.calculateBookingAmount(createDto);
        const dataToSave = Object.assign(Object.assign({}, createDto), { ma_dat_san,
            id_doi_tuong, tong_tien: tong_tien || data.tong_tien, phan_tram_giam_gia, nguoi_tao: khachHang.nguoi_tao || 0, nguoi_cap_nhat: khachHang.nguoi_cap_nhat || 0 });
        const savedBooking = await this.datSanRepo.save(dataToSave);
        await this.syncThuChi(savedBooking.id, savedBooking.nguoi_tao);
        await this.syncTrangThaiSan(savedBooking.id, savedBooking.nguoi_tao);
        return savedBooking;
    }
    async findByTaiKhoan(tai_khoan) {
        const khachHangRepo = this.dataSource.getRepository(khach_hang_entity_1.KhachHang);
        const khachHang = await khachHangRepo.findOne({
            where: { tai_khoan },
        });
        if (!khachHang) {
            return [];
        }
        const bookings = await this.datSanRepo.find({
            where: { id_khach_hang: khachHang.id },
            relations: ['san', 'doi_tuong'],
            order: { ngay_dat: 'DESC', gio_bat_dau: 'DESC' },
        });
        return bookings;
    }
    findAllWithPagination(filters) {
        return this.databaseService.findWithPagination(filters, this.datSanRepo
            .createQueryBuilder('dat_san')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_tao', 'nguoi_tao.id = dat_san.nguoi_tao')
            .leftJoin(nguoi_dung_entity_1.NguoiDung, 'nguoi_cap_nhat', 'nguoi_cap_nhat.id = dat_san.nguoi_cap_nhat')
            .leftJoin(khach_hang_entity_1.KhachHang, 'khach_hang', 'khach_hang.id = dat_san.id_khach_hang')
            .leftJoin(san_entity_1.San, 'san', 'san.id = dat_san.id_san')
            .leftJoin(doi_tuong_entity_1.DoiTuong, 'doi_tuong', 'doi_tuong.id = dat_san.id_doi_tuong'), [
            'dat_san.id as id',
            'dat_san.ma_dat_san as ma_dat_san',
            'dat_san.id_khach_hang as id_khach_hang',
            'khach_hang.ho_va_ten as ten_khach_hang',
            'khach_hang.so_dien_thoai as so_dien_thoai_khach_hang',
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
        ], []);
    }
    findAll(options) {
        return this.datSanRepo.find(options);
    }
    findOneById(id) {
        return this.datSanRepo.findOne({
            where: { id },
            relations: ['khach_hang', 'san', 'doi_tuong'],
        });
    }
    findOneBy(where) {
        return this.datSanRepo.findOneBy(where);
    }
    async update(id, updateDatSanDto) {
        var _a, _b, _c, _d;
        const existing = await this.datSanRepo.findOneBy({ id });
        if (existing) {
            const finalIdSan = (_a = updateDatSanDto.id_san) !== null && _a !== void 0 ? _a : existing.id_san;
            const finalNgayDat = (_b = updateDatSanDto.ngay_dat) !== null && _b !== void 0 ? _b : existing.ngay_dat;
            const finalGioBatDau = (_c = updateDatSanDto.gio_bat_dau) !== null && _c !== void 0 ? _c : existing.gio_bat_dau;
            const finalGioKetThuc = (_d = updateDatSanDto.gio_ket_thuc) !== null && _d !== void 0 ? _d : existing.gio_ket_thuc;
            await this.validateMaintenance(finalIdSan, finalNgayDat, finalGioBatDau, finalGioKetThuc, id);
            const { id_doi_tuong, tong_tien, phan_tram_giam_gia } = await this.calculateBookingAmount(updateDatSanDto, existing);
            await this.datSanRepo.update(id, Object.assign(Object.assign({}, updateDatSanDto), { id_doi_tuong,
                tong_tien,
                phan_tram_giam_gia }));
        }
        else {
            await this.datSanRepo.update(id, updateDatSanDto);
        }
        await this.syncThuChi(id, updateDatSanDto.nguoi_cap_nhat || 1);
        await this.syncTrangThaiSan(id, updateDatSanDto.nguoi_cap_nhat || 1);
        return await this.findOneById(id);
    }
    async remove(id) {
        await this.thuChiRepo.delete({ id_dat_san: id });
        await this.trangThaiSanRepo.delete({ id_dat_san: id });
        return this.deleteBy({ id });
    }
    removeBy(where) {
        return this.datSanRepo.update(where, {});
    }
    async deleteBy(where) {
        const bookings = await this.datSanRepo.find({ where });
        for (const booking of bookings) {
            await this.thuChiRepo.delete({ id_dat_san: booking.id });
            await this.trangThaiSanRepo.delete({ id_dat_san: booking.id });
        }
        return this.datSanRepo.delete(where);
    }
    async findForSelectOptions(filters) {
        filters.limit = -1;
        return this.databaseService.findWithPagination(filters, this.datSanRepo
            .createQueryBuilder('dat_san')
            .leftJoin(khach_hang_entity_1.KhachHang, 'khach_hang', 'khach_hang.id = dat_san.id_khach_hang')
            .leftJoin(san_entity_1.San, 'san', 'san.id = dat_san.id_san'), [
            'dat_san.id as value',
            `CONCAT(khach_hang.ho_va_ten, ' - ', san.ten_san, ' (', dat_san.ngay_dat, ')') as label`,
        ], []);
    }
};
DatSanService = DatSanService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(dat_san_entity_1.DatSan)),
    __param(2, (0, typeorm_1.InjectRepository)(thu_chi_entity_1.ThuChi)),
    __param(3, (0, typeorm_1.InjectRepository)(doi_tuong_entity_1.DoiTuong)),
    __param(4, (0, typeorm_1.InjectRepository)(quan_ly_gia_entity_1.QuanLyGia)),
    __param(5, (0, typeorm_1.InjectRepository)(trang_thai_san_entity_1.TrangThaiSan)),
    __param(6, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(7, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository, Object, typeorm_2.DataSource])
], DatSanService);
exports.DatSanService = DatSanService;
//# sourceMappingURL=dat-san.service.js.map