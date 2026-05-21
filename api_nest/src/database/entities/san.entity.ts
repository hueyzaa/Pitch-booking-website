import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LoaiSan } from './loai-san.entity';

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

  @ManyToOne(() => LoaiSan, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_loai_san' })
  loai_san: LoaiSan;
}
