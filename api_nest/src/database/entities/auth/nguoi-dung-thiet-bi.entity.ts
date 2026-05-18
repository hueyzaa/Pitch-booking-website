import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NguoiDung } from './nguoi-dung.entity';

@Index('fk_nguoi_dung_thiet_bi_nguoi_dung_1', ['nguoi_dung_id'], {})
@Index('idx_nguoi_dung_thiet_bi_unique_1', ['nguoi_dung_id', 'device_id'], {
  unique: true,
})
@Entity('nguoi_dung_thiet_bi', {  synchronize: false })
export class NguoiDungThietBi {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

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

  @Column('longtext', { name: 'access_token', nullable: true })
  access_token: string | null;

  @Column('longtext', { name: 'refresh_token', nullable: true })
  refresh_token: string | null;

  @Column('longtext', { name: 'firebase_token', nullable: true })
  firebase_token: string | null;

  @Column('varchar', { name: 'device_id', length: 255 })
  device_id: string;

  @ManyToOne(() => NguoiDung, (nguoi_dung) => nguoi_dung.nguoi_dung_thiet_bis, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'nguoi_dung_id', referencedColumnName: 'id' }])
  nguoi_dung: NguoiDung;
}
