import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { San } from './san.entity';
import { DatSan } from './dat-san.entity';

@Entity('trang_thai_san', { synchronize: true })
export class TrangThaiSan {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'id_san' })
  id_san: number;

  @Column('int', { name: 'id_dat_san', nullable: true })
  id_dat_san: number | null;

  @Column('date', { name: 'ngay' })
  ngay: string;

  @Column('time', { name: 'gio_bat_dau' })
  gio_bat_dau: string;

  @Column('time', { name: 'gio_ket_thuc' })
  gio_ket_thuc: string;

  @Column('tinyint', {
    name: 'trang_thai',
    default: 0,
    comment: '0=Trống, 1=Đã đặt, 2=Bảo trì',
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

  @ManyToOne(() => San, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_san' })
  san: San;

  @ManyToOne(() => DatSan, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'id_dat_san' })
  dat_san: DatSan | null;
}
