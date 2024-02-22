import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProject } from '../../models/interface/project.interface';
import { ProjectCardComponent } from '../../common/ui-blocks/project-card/project-card.component';
import { NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../../common/ui-blocks/project-dialog/project-dialog.component';
import { DeleteDialogComponent } from '../../common/ui-blocks/delete-dialog/delete-dialog.component';
import { ProjectsService } from '../../services/projects.service';
import { ReqUpdateProject } from '../../models/dto/project.dto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProjectCardComponent, NgFor, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  public projectList: IProject[];

  constructor(
    public projectsService: ProjectsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchProjectListByUser();
    this.projectsService.projectHasChanged$$.subscribe((result) => {
      if (result) {
        this.fetchProjectListByUser();
      }
    });
  }

  fetchProjectListByUser() {
    this.projectsService
      .listUserProjects(localStorage.getItem('userId') || '')
      .subscribe((res) => {
        this.projectList = res || [];
      });
  }

  openDialog(data?: IProject) {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      data: {
        id: data?.id,
        title: data?.title || '',
        description: data?.description || '',
        projectCode: data?.projectCode || '',
        status: data?.status || 'OPENED',
      },
    });

    dialogRef.afterClosed().subscribe((result: IProject) => {
      if (result) {
        const req: ReqUpdateProject = {
          id: result.id,
          title: result.title,
          description: result.description,
          projectCode: result.projectCode,
          status: result.status,
        };
        this.projectsService.updateProject(req).subscribe((res) => {
          this.fetchProjectListByUser();
        });
      }
    });
  }

  openDeleteDialog(data: IProject) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: data?.title,
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.projectsService.deleteProject(data.id).subscribe((res) => {
          this.fetchProjectListByUser();
        });
      }
    });
  }
}
