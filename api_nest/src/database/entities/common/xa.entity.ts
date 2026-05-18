import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NguoiDung } from '../auth/nguoi-dung.entity';

@Index('fk_ward_province_code_1', ['province_code'], {})
@Entity('wards', {  synchronize: false })
export class Xa {
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

  @Column('varchar', { name: 'province_code', nullable: true })
  province_code: string | null;

  @OneToMany(() => NguoiDung, (nguoi_dung) => nguoi_dung.xa)
  nguoi_dungs: NguoiDung[];
}
