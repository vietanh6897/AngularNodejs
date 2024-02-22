import { Project } from 'src/projects/entity/project.entity';
import { Task } from 'src/tasks/entity/task.entity';
import { User } from 'src/users/entity/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  projectId: string;

  @Column()
  userId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Project, (project) => project.members, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @ManyToOne(() => User, (user) => user.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Task, (task) => task.member)
  tasks: Task;

  // Add more properties or relationships as needed
}
