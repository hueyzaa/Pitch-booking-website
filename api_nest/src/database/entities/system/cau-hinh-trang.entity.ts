import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cau_hinh_trang')
export class CauHinhTrang {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'key', unique: true, length: 255 })
  key: string;

  @Column('text', { name: 'value', nullable: true })
  value: string;

  @Column('varchar', { name: 'mo_ta', nullable: true, length: 500 })
  mo_ta: string;

  @Column('varchar', { name: 'loai', default: 'text', length: 50 })
  loai: string; // 'text', 'image', 'number', 'boolean'

  @Column('int', { name: 'nguoi_tao', nullable: true })
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
