import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('thu_chi', { synchronize: true })
export class ThuChi {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('tinyint', { name: 'loai_giao_dich', comment: '1=Thu, 0=Chi' })
  loai_giao_dich: number;

  @Column('varchar', { name: 'danh_muc', length: 255 })
  danh_muc: string;

  @Column('decimal', { name: 'so_tien', precision: 15, scale: 0 })
  so_tien: number;

  @Column('date', { name: 'ngay_giao_dich' })
  ngay_giao_dich: string;

  @Column('varchar', { name: 'mo_ta', length: 500, nullable: true })
  mo_ta: string | null;

  @Column('int', { name: 'id_nguoi_dung', nullable: true })
  id_nguoi_dung: number | null;

  @Column('int', { name: 'id_san', nullable: true })
  id_san: number | null;

  @Column('int', { name: 'id_dat_san', nullable: true })
  id_dat_san: number | null;

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
}
