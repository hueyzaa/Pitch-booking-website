import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('doi_tuong', { synchronize: true })
export class DoiTuong {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'ten_doi_tuong', length: 255 })
  ten_doi_tuong: string;

  @Column('int', { name: 'phan_tram_giam_gia', default: 0 })
  phan_tram_giam_gia: number;

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
