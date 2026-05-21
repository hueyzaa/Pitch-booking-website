import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { KhachHang } from './khach-hang.entity';
import { San } from './san.entity';
import { DoiTuong } from './doi-tuong.entity';

@Entity('dat_san', { synchronize: true })
export class DatSan {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'ma_dat_san', unique: true, length: 50 })
  ma_dat_san: string;

  @Column('int', { name: 'id_khach_hang' })
  id_khach_hang: number;

  @Column('int', { name: 'id_san' })
  id_san: number;

  @Column('int', { name: 'id_doi_tuong', nullable: true })
  id_doi_tuong: number | null;

  @Column('int', { name: 'phan_tram_giam_gia', default: 0 })
  phan_tram_giam_gia: number;

  @Column('date', { name: 'ngay_dat' })
  ngay_dat: string;

  @Column('time', { name: 'gio_bat_dau' })
  gio_bat_dau: string;

  @Column('time', { name: 'gio_ket_thuc' })
  gio_ket_thuc: string;

  @Column('decimal', { name: 'tong_tien', precision: 15, scale: 0, default: 0 })
  tong_tien: number;

  @Column('tinyint', {
    name: 'trang_thai',
    default: 0,
    comment: '0: Chưa thanh toán, 1: Đã thanh toán, 2: Đã hủy',
  })
  trang_thai: number;

  @Column('varchar', { name: 'ghi_chu', length: 500, nullable: true })
  ghi_chu: string | null;

  @Column('int', { name: 'nguoi_tao' })
  nguoi_tao: number;

  @Column('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' })
  ngay_tao: Date;

  @Column('int', { name: 'nguoi_cap_nhat', nullable: true })
  nguoi_cap_nhat: number | null;

  @Column('datetime', {
    name: 'ngay_cap_nhat',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP',
  })
  ngay_cap_nhat: Date;

  @ManyToOne(() => KhachHang, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_khach_hang' })
  khach_hang: KhachHang;

  @ManyToOne(() => San, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_san' })
  san: San;

  @ManyToOne(() => DoiTuong, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'id_doi_tuong' })
  doi_tuong: DoiTuong | null;
}
