import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LoaiSan } from './loai-san.entity';
import { Tinh } from './common/tinh.entity';
import { Xa } from './common/xa.entity';

@Entity('san', { synchronize: true })
export class San {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'ten_san', length: 255 })
  ten_san: string;

  @Column('int', { name: 'id_loai_san' })
  id_loai_san: number;

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

  @Column('varchar', { name: 'dia_chi', length: 500, nullable: true })
  dia_chi: string | null;

  @Column('int', { name: 'tinh_id', nullable: true })
  tinh_id: number | null;

  @Column('int', { name: 'xa_id', nullable: true })
  xa_id: number | null;

  @Column('simple-array', { name: 'tien_ich', nullable: true })
  tien_ich: string[] | null;

  @Column('longtext', { name: 'anh_chinh', nullable: true })
  anh_chinh: string | null;

  @Column('longtext', { name: 'anh_chi_tiet', nullable: true })
  anh_chi_tiet: string | null;

  @Column('text', { name: 'mo_ta', nullable: true })
  mo_ta: string | null;

  @ManyToOne(() => LoaiSan, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_loai_san' })
  loai_san: LoaiSan;

  @ManyToOne(() => Tinh, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  @JoinColumn({ name: 'tinh_id' })
  tinh: Tinh;

  @ManyToOne(() => Xa, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  @JoinColumn({ name: 'xa_id' })
  xa: Xa;
}
