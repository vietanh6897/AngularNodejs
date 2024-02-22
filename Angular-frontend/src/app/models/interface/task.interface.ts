import { IMember } from './member.interface';

export interface ITask {
  id: string;
  title: string;
  assignee: string;
  description: string;
  priority: string;
  dueDate: Date;
  startDate: Date;
  category: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  member: IMember;
}
