import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NguoiDung } from './nguoi-dung.entity';
import { VaiTro } from './vai-tro.entity';

@Index('nguoi_dung_vai_tro_nguoi_dung_id', ['nguoi_dung_id'], {})
@Index('nguoi_dung_vai_tro_vai_tro_id', ['vai_tro_id'], {})
@Entity('nguoi_dung_vai_tro', {  synchronize: false })
export class NguoiDungVaiTro {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'nguoi_dung_id' })
  nguoi_dung_id: number;

  @Column('int', { name: 'vai_tro_id' })
  vai_tro_id: number;

  @Column('varchar', { name: 'ghi_chu', nullable: true, length: 255 })
  ghi_chu: string | null;

  @Column('int', { name: 'nguoi_tao', nullable: true })
  nguoi_tao: number | null;

  @Column('int', { name: 'nguoi_cap_nhat', nullable: true })
  nguoi_cap_nhat: number | null;

  @Column('datetime', {
    name: 'ngay_tao',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  ngay_tao: Date | null;

  @Column('datetime', {
    name: 'ngay_cap_nhat',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  ngay_cap_nhat: Date | null;

  @ManyToOne(() => NguoiDung, (nguoi_dung) => nguoi_dung.nguoi_dung_vai_tros, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'nguoi_dung_id', referencedColumnName: 'id' }])
  nguoi_dung: NguoiDung;

  @ManyToOne(() => VaiTro, (vai_tro) => vai_tro.nguoi_dung_vai_tros, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'vai_tro_id', referencedColumnName: 'id' }])
  vai_tro: VaiTro;
}
