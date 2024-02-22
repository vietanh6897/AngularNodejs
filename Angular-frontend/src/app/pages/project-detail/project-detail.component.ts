import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ProjectBoardTabComponent } from './project-board-tab/project-board-tab.component';
import { ProjectSummaryTabComponent } from './project-summary-tab/project-summary-tab.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    MatTabsModule,
    ProjectBoardTabComponent,
    ProjectSummaryTabComponent,
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css',
})
export class ProjectDetailComponent {}
