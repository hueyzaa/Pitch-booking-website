import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsNumber,
  IsString,
  IsIn,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDatSanDto {
  @IsOptional()
  @IsString()
  ma_dat_san?: string;

  @IsNotEmpty()
  @IsInt()
  id_nguoi_dung: number;

  @IsNotEmpty()
  @IsInt()
  id_san: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'ngay_dat must be in format YYYY-MM-DD',
  })
  ngay_dat: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/, {
    message: 'gio_bat_dau must be in format HH:mm',
  })
  gio_bat_dau: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/, {
    message: 'gio_ket_thuc must be in format HH:mm',
  })
  gio_ket_thuc: string;

  @IsNotEmpty()
  @IsNumber()
  tong_tien: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id_doi_tuong?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  phan_tram_giam_gia?: number;

  @IsNotEmpty()
  @IsInt()
  @IsIn([0, 1, 2])
  trang_thai: number;

  @IsOptional()
  @IsString()
  ghi_chu?: string;

  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}

export class UpdateDatSanDto {
  @IsOptional()
  @IsInt()
  id_nguoi_dung?: number;

  @IsOptional()
  @IsInt()
  id_san?: number;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'ngay_dat must be in format YYYY-MM-DD',
  })
  ngay_dat?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/, {
    message: 'gio_bat_dau must be in format HH:mm',
  })
  gio_bat_dau?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/, {
    message: 'gio_ket_thuc must be in format HH:mm',
  })
  gio_ket_thuc?: string;

  @IsOptional()
  @IsNumber()
  tong_tien?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id_doi_tuong?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  phan_tram_giam_gia?: number;

  @IsOptional()
  @IsInt()
  @IsIn([0, 1, 2])
  trang_thai?: number;

  @IsOptional()
  @IsString()
  ghi_chu?: string;

  @IsOptional()
  @IsString()
  ma_dat_san?: string;

  nguoi_cap_nhat?: number;
}
