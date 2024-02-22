import { Member } from 'src/members/entity/member.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  assignee: string;

  @Column()
  description: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: 'Lowest',
    comment: 'Lowest | Low | High |  Highest',
  })
  priority: string;

  @Column()
  dueDate: Date;

  @Column()
  startDate: Date;

  @Column({
    type: 'varchar',
    length: 255,
    default: 'Feature',
    comment: 'Feature | Bug',
  })
  category: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: 'TODO',
    comment: 'TODO | INPROGRESS | TESTING |  DONE',
  })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Member, (member) => member.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'assignee' })
  member: Member;

  // Add more columns as needed
}
