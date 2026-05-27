import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DoiTuong } from './doi-tuong.entity';

@Entity('khach_hang', { synchronize: true })
export class KhachHang {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'ho_va_ten', length: 255 })
  ho_va_ten: string;

  @Column('varchar', { name: 'so_dien_thoai', length: 50 })
  so_dien_thoai: string;

  @Column('varchar', { name: 'email', length: 255, nullable: true })
  email: string | null;

  @Column('text', { name: 'dia_chi', nullable: true })
  dia_chi: string | null;

  @Column('date', { name: 'ngay_sinh', nullable: true })
  ngay_sinh: Date | null;

  @Column('int', { name: 'gioi_tinh', nullable: true, comment: '0: Nữ | 1:Nam' })
  gioi_tinh: number | null;

  @Column('int', { name: 'id_doi_tuong' })
  id_doi_tuong: number;

  @Column('varchar', { name: 'ho', length: 255, nullable: true })
  ho: string | null;

  @Column('varchar', { name: 'ten', length: 255, nullable: true })
  ten: string | null;

  @Column('varchar', { name: 'tai_khoan', length: 255, nullable: true })
  tai_khoan: string | null;

  @Column('varchar', { name: 'mat_khau', length: 255, nullable: true })
  mat_khau: string | null;

  @Column('int', { name: 'tinh_id', nullable: true })
  tinh_id: number | null;

  @Column('int', { name: 'xa_id', nullable: true })
  xa_id: number | null;

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

  @ManyToOne(() => DoiTuong, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_doi_tuong' })
  doi_tuong: DoiTuong;
}
