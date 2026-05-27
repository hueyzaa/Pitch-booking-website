"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const log_thao_tac_entity_1 = require("./entities/system/log-thao-tac.entity");
const cau_hinh_chung_entity_1 = require("./entities/system/cau-hinh-chung.entity");
const log_entity_1 = require("./entities/system/log.entity");
const thong_bao_entity_1 = require("./entities/system/thong-bao.entity");
const cau_hinh_trang_entity_1 = require("./entities/system/cau-hinh-trang.entity");
const he_thong_entity_1 = require("./entities/system/he-thong.entity");
const quan_ly_upload_entity_1 = require("./entities/system/quan-ly-upload.entity");
const quan_ly_upload_permission_entity_1 = require("./entities/system/quan-ly-upload-permission.entity");
const nguoi_dung_thiet_bi_entity_1 = require("./entities/auth/nguoi-dung-thiet-bi.entity");
const nguoi_dung_entity_1 = require("./entities/auth/nguoi-dung.entity");
const vai_tro_entity_1 = require("./entities/auth/vai-tro.entity");
const nguoi_dung_vai_tro_entity_1 = require("./entities/auth/nguoi-dung-vai-tro.entity");
const tinh_entity_1 = require("./entities/common/tinh.entity");
const xa_entity_1 = require("./entities/common/xa.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_service_1 = require("./database.service");
const loai_san_entity_1 = require("./entities/loai-san.entity");
const san_entity_1 = require("./entities/san.entity");
const doi_tuong_entity_1 = require("./entities/doi-tuong.entity");
const khach_hang_entity_1 = require("./entities/khach-hang.entity");
const bang_gia_entity_1 = require("./entities/bang-gia.entity");
const quan_ly_gia_entity_1 = require("./entities/quan-ly-gia.entity");
const thu_chi_entity_1 = require("./entities/thu-chi.entity");
const trang_thai_san_entity_1 = require("./entities/trang-thai-san.entity");
const dat_san_entity_1 = require("./entities/dat-san.entity");
const danh_gia_entity_1 = require("./entities/danh-gia.entity");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                nguoi_dung_thiet_bi_entity_1.NguoiDungThietBi,
                nguoi_dung_entity_1.NguoiDung,
                vai_tro_entity_1.VaiTro,
                cau_hinh_chung_entity_1.CauHinhChung,
                tinh_entity_1.Tinh,
                xa_entity_1.Xa,
                thong_bao_entity_1.ThongBao,
                log_entity_1.Log,
                log_thao_tac_entity_1.LogThaoTac,
                cau_hinh_trang_entity_1.CauHinhTrang,
                he_thong_entity_1.HeThong,
                quan_ly_upload_entity_1.QuanLyUpload,
                quan_ly_upload_permission_entity_1.QuanLyUploadPermission,
                nguoi_dung_vai_tro_entity_1.NguoiDungVaiTro,
                loai_san_entity_1.LoaiSan,
                san_entity_1.San,
                doi_tuong_entity_1.DoiTuong,
                khach_hang_entity_1.KhachHang,
                bang_gia_entity_1.BangGia,
                quan_ly_gia_entity_1.QuanLyGia,
                thu_chi_entity_1.ThuChi,
                trang_thai_san_entity_1.TrangThaiSan,
                dat_san_entity_1.DatSan,
                danh_gia_entity_1.DanhGia,
            ]),
        ],
        providers: [database_service_1.DatabaseService],
        exports: [typeorm_1.TypeOrmModule, database_service_1.DatabaseService],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map