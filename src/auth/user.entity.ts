import { Task } from '../tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) // prevent multipule users with the same username
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true }) //eager will fetch the tasks with the user
  tasks: Task[]; // db relation one to many , one user to many tasks
}
