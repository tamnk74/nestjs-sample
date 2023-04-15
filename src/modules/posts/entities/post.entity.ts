import { UserEntity } from '@/modules/users/entities';
import { instanceToPlain } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ unique: true })
  slug!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column({ default: 0 })
  status!: number;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  author!: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
