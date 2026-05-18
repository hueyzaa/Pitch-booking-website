import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Xa } from './xa.entity';
import { NguoiDung } from '../auth/nguoi-dung.entity';

@Index('fk_province_code', ['code'], {})
@Entity('provinces', {  synchronize: false })
export class Tinh {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'code', length: 255 })
  code: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'full_name', length: 255 })
  full_name: string;

  @Column('varchar', { name: 'slug', length: 255 })
  slug: string;

  @Column('varchar', { name: 'type', length: 255 })
  type: string;

  @Column('varchar', { name: 'is_central', length: 255 })
  is_central: string;

  @OneToMany(() => Xa, (xa) => xa.province_code)
  xas: Xa[];

  @OneToMany(() => NguoiDung, (nguoi_dung) => nguoi_dung.tinh)
  nguoi_dungs: NguoiDung[];
}
