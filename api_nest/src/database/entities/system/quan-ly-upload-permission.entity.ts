import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { QuanLyUpload } from './quan-ly-upload.entity';
import { NguoiDung } from '../auth/nguoi-dung.entity';

@Entity('quan_ly_upload_permission', {
  
  synchronize: false,
})
export class QuanLyUploadPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  file_id: number;

  @Column('int')
  user_id: number;

  @ManyToOne(() => QuanLyUpload)
  @JoinColumn({ name: 'file_id' })
  file: QuanLyUpload;

  @ManyToOne(() => NguoiDung)
  @JoinColumn({ name: 'user_id' })
  user: NguoiDung;
}
