import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuanLyUploadPermission } from './quan-ly-upload-permission.entity';

@Entity('quan_ly_upload', {  synchronize: false })
export class QuanLyUpload {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'original_name', length: 255 })
  original_name: string;

  @Column('varchar', { name: 'file_path', length: 255 })
  file_path: string;

  @Column('varchar', { name: 'mime_type', length: 255 })
  mime_type: string;

  @Column('varchar', { name: 'loai_file', length: 10 })
  loai_file: string;

  @Column('varchar', { name: 'destination', length: 255 })
  destination: string;

  @Column('varchar', { name: 'file_name', length: 255 })
  file_name: string;

  @Column('varchar', { name: 'path', length: 255 })
  path: string;

  @Column('int', { name: 'size' })
  size: number;

  @Column('varchar', { name: 'file_type', length: 255 })
  file_type: string;

  @Column('int', { name: 'nguoi_tao' })
  nguoi_tao: number;

  @Column('datetime', { name: 'ngay_tao', default: () => 'CURRENT_TIMESTAMP' })
  ngay_tao: Date;

  @Column('int', { name: 'nguoi_cap_nhat' })
  nguoi_cap_nhat: number;

  @Column('datetime', {
    name: 'ngay_cap_nhat',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP',
  })
  ngay_cap_nhat: Date;

  // Thêm đoạn này để khai báo relation
  @OneToMany(() => QuanLyUploadPermission, (permission) => permission.file)
  permissions: QuanLyUploadPermission[];
}
