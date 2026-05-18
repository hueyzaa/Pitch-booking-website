import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NguoiDung } from './nguoi-dung.entity';
import { NguoiDungVaiTro } from './nguoi-dung-vai-tro.entity';

@Index('IDX_78a310d98cdb4b609df5fd3468', ['ma_vai_tro'], { unique: true })
@Index('idx_vt_ma_vai_tro', ['ma_vai_tro'], { unique: true })
@Entity('vai_tro', {  synchronize: false })
export class VaiTro {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'ma_vai_tro', unique: true, length: 255 })
  ma_vai_tro: string;

  @Column('varchar', { name: 'ten_vai_tro', length: 255 })
  ten_vai_tro: string;

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

  @Column('int', { name: 'trang_thai', default: () => "'1'" })
  trang_thai: number;

  @Column('text', { name: 'phan_quyen' })
  phan_quyen: string;

  @OneToMany(() => NguoiDung, (nguoi_dung) => nguoi_dung.ma_vai_tro2)
  nguoi_dungs: NguoiDung[];

  @OneToMany(
    () => NguoiDungVaiTro,
    (nguoi_dung_vai_tro) => nguoi_dung_vai_tro.vai_tro,
  )
  nguoi_dung_vai_tros: NguoiDungVaiTro[];
}
