import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bang_gia', { synchronize: true })
export class BangGia {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'ten_bang_gia', length: 255 })
  ten_bang_gia: string;

  @Column('decimal', { name: 'don_gia', precision: 15, scale: 0 })
  don_gia: number;

  @Column('varchar', { name: 'gio_bat_dau', length: 10, nullable: true })
  gio_bat_dau: string | null;

  @Column('varchar', { name: 'gio_ket_thuc', length: 10, nullable: true })
  gio_ket_thuc: string | null;

  @Column('int', { name: 'id_loai_san', nullable: true })
  id_loai_san: number | null;

  @Column('int', { name: 'id_doi_tuong', nullable: true })
  id_doi_tuong: number | null;

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
