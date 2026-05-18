import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('idx_chc_key', ['key'], { unique: true })
@Entity('cau_hinh_chung', {  synchronize: false })
export class CauHinhChung {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'key', unique: true, length: 255 })
  key: string;

  @Column('text', { name: 'value' })
  value: string;

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
