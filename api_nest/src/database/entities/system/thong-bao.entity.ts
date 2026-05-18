import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NguoiDung } from '../auth/nguoi-dung.entity';

@Index('nguoi_dung_id', ['nguoi_dung_id'], {})
@Entity('thong_bao', { synchronize: false })
export class ThongBao {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'da_xem' })
  da_xem: number;

  @Column('int', { name: 'nguoi_dung_id' })
  nguoi_dung_id: number;

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

  @Column('varchar', { name: 'tieu_de', length: 255 })
  tieu_de: string;

  @Column('varchar', { name: 'noi_dung', length: 255 })
  noi_dung: string;

  @ManyToOne(() => NguoiDung, (nguoi_dung) => nguoi_dung.thong_baos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'nguoi_dung_id', referencedColumnName: 'id' }])
  nguoi_dung: NguoiDung;
}
