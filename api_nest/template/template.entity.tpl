import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('[module_name]', { synchronize: false })
export class [ModuleName] {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255 })
  @Index({ unique: true })
  code: string;

  @Column({ length: 255 })
  description: string;

  @Column()
  is_active: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: false })
  updated_at: Date;
}
