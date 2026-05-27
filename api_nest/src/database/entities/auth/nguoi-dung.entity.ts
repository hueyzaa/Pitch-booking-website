import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NguoiDungThietBi } from './nguoi-dung-thiet-bi.entity';
import { ThongBao } from '../system/thong-bao.entity';
import { Tinh } from '../common/tinh.entity';
import { VaiTro } from './vai-tro.entity';
import { Xa } from '../common/xa.entity';
import { NguoiDungVaiTro } from './nguoi-dung-vai-tro.entity';
import { DoiTuong } from '../doi-tuong.entity';

@Index('fk_nguoi_dung_vai_tro_1', ['ma_vai_tro'], {})
@Index('idx_nd_email', ['email'], { unique: true })
@Index('idx_nd_taikhoan', ['tai_khoan'], { unique: true })
@Index('tinh_id', ['tinh_id'], {})
@Index('xa_id', ['xa_id'], {})
@Entity('nguoi_dung', { synchronize: false })
export class NguoiDung {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

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

  @Column('varchar', { name: 'tai_khoan', length: 255 })
  tai_khoan: string;

  @Column('varchar', { name: 'mat_khau', length: 255 })
  mat_khau: string;

  @Column('varchar', { name: 'so_dien_thoai', length: 255 })
  so_dien_thoai: string;

  @Column('varchar', {
    name: 'email',
    nullable: true,
    unique: true,
    length: 255,
  })
  email: string | null;

  @Column('varchar', { name: 'ma_vai_tro', length: 255 })
  ma_vai_tro: string;

  @Column('varchar', { name: 'reset_pass_token', nullable: true, length: 255 })
  reset_pass_token: string | null;

  @Column('varchar', { name: 'avatar', length: 255, nullable: true })
  avatar: string;

  @Column('text', { name: 'ho' })
  ho: string;

  @Column('text', { name: 'ten' })
  ten: string;

  @Column('text', { name: 'ho_va_ten' })
  ho_va_ten: string;

  @Column('int', { name: 'id_doi_tuong', nullable: true })
  id_doi_tuong: number | null;

  @Column('text', { name: 'san_yeu_thich', nullable: true })
  san_yeu_thich: string | null;

  @Column('date', { name: 'ngay_sinh' })
  ngay_sinh: Date;

  @Column('int', { name: 'gioi_tinh', comment: '0: Nữ | 1:Nam' })
  gioi_tinh: number;

  @Column('text', { name: 'dia_chi' })
  dia_chi: string;

  @Column('int', { name: 'tinh_id' })
  tinh_id: number;

  @Column('int', { name: 'xa_id' })
  xa_id: number;

  @Column('int', {
    name: 'trang_thai',
    comment: '0: Bị khoá | 1: Không bị khoá',
    default: () => "'1'",
  })
  trang_thai: number;

  @Column('int', {
    name: 'need_change_password',
    comment: '0: Không cần đổi | 1: Bắt buộc đổi | 2: Cần thay đổi',
    default: () => "'1'",
  })
  need_change_password: number;

  @Column('datetime', { name: 'last_password_change', nullable: true })
  last_password_change: Date;

  @Column('varchar', { name: 'otp_secret', length: 255, nullable: true })
  otp_secret: string | null;

  @Column('int', {
    name: 'is_otp_verify',
    comment: '0: Chưa xác thực | 1: Xác thực',
    default: () => "'0'",
  })
  is_otp_verify: number;

  @Column('datetime', { name: 'last_otp_verified', nullable: true })
  last_otp_verified: Date | null;

  @ManyToOne(() => VaiTro, (vai_tro) => vai_tro.nguoi_dungs, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'ma_vai_tro', referencedColumnName: 'ma_vai_tro' }])
  ma_vai_tro2: VaiTro;

  @ManyToOne(() => Tinh, (tinh) => tinh.nguoi_dungs, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'tinh_id', referencedColumnName: 'id' }])
  tinh: Tinh;

  @ManyToOne(() => Xa, (xa) => xa.nguoi_dungs, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'xa_id', referencedColumnName: 'id' }])
  xa: Xa;

  @ManyToOne(() => DoiTuong, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_doi_tuong' })
  doi_tuong: DoiTuong;

  @OneToMany(
    () => NguoiDungThietBi,
    (nguoi_dung_thiet_bi) => nguoi_dung_thiet_bi.nguoi_dung,
  )
  nguoi_dung_thiet_bis: NguoiDungThietBi[];

  @OneToMany(() => ThongBao, (thong_bao) => thong_bao.nguoi_dung)
  thong_baos: ThongBao[];

  @OneToMany(
    () => NguoiDungVaiTro,
    (nguoi_dung_vai_tro) => nguoi_dung_vai_tro.nguoi_dung,
  )
  nguoi_dung_vai_tros: NguoiDungVaiTro[];
}
