import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity({ name: 'to-dos' })
export class TodoEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  status!: number;
}
