import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('log', {  synchronize: false })
export class Log {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('longtext', { name: 'device_id', nullable: true })
  device_id: string;

  @Column('longtext', { name: 'user_id', nullable: true })
  user_id: string;

  @Column('varchar', { name: 'method', nullable: true })
  method: string;

  @Column('varchar', { name: 'request_url', nullable: true })
  request_url: string;

  @Column('varchar', { name: 'request_param', nullable: true })
  request_param: string;

  @Column('varchar', { name: 'request_query', nullable: true })
  request_query: string;

  @Column('longtext', { name: 'request_header', nullable: true })
  request_header: string;

  @Column('longtext', { name: 'request_body', nullable: true })
  request_body: string;

  @Column('varchar', { name: 'response_code', nullable: true })
  response_code: string;

  @Column('longtext', { name: 'response_body', nullable: true })
  response_body: string;

  @Column('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' })
  ngay_tao: Date;

  @Column('datetime', {
    name: 'ngay_cap_nhat',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP',
  })
  ngay_cap_nhat: Date;
}
