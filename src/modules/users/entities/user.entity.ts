import { Exclude } from 'class-transformer';
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  @Exclude()
  password!: string;
}
