import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('idx_log_truycap_user_id', ['user_id'])
@Entity('log_thao_tac', {  synchronize: true })
export class LogThaoTac {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'user_id', nullable: true })
  user_id: number | null;

  @Column('varchar', { name: 'ho_ten', nullable: true, length: 255 })
  ho_ten: string | null;

  @Column('varchar', { name: 'url', nullable: true, length: 255 })
  url: string | null;

  @Column('varchar', { name: 'ip', nullable: true, length: 255 })
  ip: string | null;

  @Column('varchar', { name: 'mo_ta_url', nullable: true, length: 255 })
  mo_ta_url: string | null;

  @Column('varchar', { name: 'mo_ta', nullable: true, length: 255 })
  mo_ta: string | null;

  @Column('varchar', { name: 'phan_loai', nullable: true, length: 255 })
  phan_loai: string | null;

  @Column('varchar', { name: 'muc_do', nullable: true, length: 255 })
  muc_do: string | null;

  @Column('longtext', { name: 'noi_dung', nullable: true })
  noi_dung: string | null;

  @Column('varchar', { name: 'ket_qua', nullable: true, length: 255 })
  ket_qua: string | null;

  @Column('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' })
  ngay_tao: Date;
}
