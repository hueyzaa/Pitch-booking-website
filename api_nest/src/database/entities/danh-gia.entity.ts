import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { NguoiDung } from './auth/nguoi-dung.entity';
import { San } from './san.entity';

@Entity('danh_gia', { synchronize: true })
export class DanhGia {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'id_nguoi_dung' })
  id_nguoi_dung: number;

  @Column('int', { name: 'id_san' })
  id_san: number;

  @Column('int', { name: 'so_sao', default: 5 })
  so_sao: number;

  @Column('text', { name: 'noi_dung', nullable: true })
  noi_dung: string | null;

  @Column('tinyint', { name: 'trang_thai', default: 1 })
  trang_thai: number;

  @Column('int', { name: 'nguoi_tao', nullable: true })
  nguoi_tao: number | null;

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

  @ManyToOne(() => NguoiDung, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_nguoi_dung' })
  nguoi_dung: NguoiDung;

  @ManyToOne(() => San, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_san' })
  san: San;
}
