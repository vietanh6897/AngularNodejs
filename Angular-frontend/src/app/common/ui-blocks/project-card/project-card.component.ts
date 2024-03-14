import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProject } from '../../../models/interface/project.interface';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [MatCardModule, RouterModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
  @Input() projectInfo: IProject = {
    id: '',
    title: '',
    description: '',
    projectCode: '',
    status: '',
  };
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  onEdit(e: any) {
    e.preventDefault();
    this.edit.emit();
  }
  onDelete(e: any) {
    e.preventDefault();
    this.delete.emit();
  }
}
