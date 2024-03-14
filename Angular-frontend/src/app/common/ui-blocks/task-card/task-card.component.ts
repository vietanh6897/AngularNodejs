import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../../../models/interface/task.interface';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatCardModule, DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input() task: ITask = {
    id: '',
    title: '',
    assignee: '',
    description: '',
    priority: '',
    dueDate: new Date(),
    startDate: new Date(),
    category: '',
    status: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    member: {
      id: '',
      projectId: '',
      userId: '',
      user: {
        id: '',
        username: '',
        email: '',
      },
    },
  };
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
}
