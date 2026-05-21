import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quan_ly_gia', { synchronize: true })
export class QuanLyGia {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'id_san' })
  id_san: number;

  @Column('int', { name: 'id_bang_gia', nullable: true })
  id_bang_gia: number | null;

  @Column('int', { name: 'id_doi_tuong', nullable: true })
  id_doi_tuong: number | null;

  @Column('decimal', {
    name: 'gia_theo_gio',
    precision: 15,
    scale: 0,
    default: 0,
  })
  gia_theo_gio: number;

  @Column('decimal', { name: 'don_gia', precision: 15, scale: 0, default: 0 })
  don_gia: number;

  @Column('date', { name: 'ngay_bat_dau', nullable: true })
  ngay_bat_dau: string | null;

  @Column('date', { name: 'ngay_ket_thuc', nullable: true })
  ngay_ket_thuc: string | null;

  @Column('tinyint', { name: 'trang_thai', default: 1 })
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
}
