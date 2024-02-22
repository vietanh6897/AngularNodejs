import { Member } from 'src/members/entity/member.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'varchar', length: 10, unique: true })
  projectCode: string;

  @Column()
  description: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: 'OPENED',
    comment: 'OPENED | PENDING | CLOSED',
  })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Member, (member) => member.project)
  members: Member[];

  // Add more properties as needed
}
