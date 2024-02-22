import { UsersService } from './../../../services/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { MatCardModule } from '@angular/material/card';
import { IProject } from '../../../models/interface/project.interface';
import { ProjectsService } from '../../../services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { PieChartComponent } from '../../../common/ui-blocks/pie-chart/pie-chart.component';
import { ChartOptions, ChartDataset } from 'chart.js';
import { IUser } from '../../../models/interface/user.interface';
import { ITask } from '../../../models/interface/task.interface';
import { MembersService } from '../../../services/members.service';
import { TasksService } from '../../../services/tasks.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ReqMember } from '../../../models/dto/member.dto';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../common/ui-blocks/delete-dialog/delete-dialog.component';
import { IMember } from '../../../models/interface/member.interface';

@Component({
  selector: 'app-project-summary-tab',
  standalone: true,
  imports: [
    MatCardModule,
    DatePipe,
    PieChartComponent,
    NgFor,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './project-summary-tab.component.html',
  styleUrl: './project-summary-tab.component.css',
})
export class ProjectSummaryTabComponent implements OnInit {
  public userInfo = JSON.parse(this.localStore.getData('userInfo') || '');
  public projectDetail: IProject = {
    id: '',
    description: '',
    projectCode: '',
    status: '',
    title: '',
  };
  public projectMembers: IMember[] = [];
  public projectTasks: ITask[] = [];

  //Pie
  @ViewChild(PieChartComponent) pieChartComponent: PieChartComponent;
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: false,
      },
    },
  };
  public pieChartLabels = ['TODO', 'INPROGRESS', 'TESTING', 'DONE'];
  public pieChartDatasets: ChartDataset[];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  //Multi select
  selectedUsers: string[] = [];
  availableUsers: IUser[] = [];

  //projectId
  projectId: string;

  constructor(
    private localStore: LocalStorageService,
    public projectsService: ProjectsService,
    public membersService: MembersService,
    public tasksService: TasksService,
    public usersService: UsersService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.projectId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.fetchProjectDetail();
    this.fetchProjectMembers();
    this.fetchProjectTasks();
    this.fetchAvailableUsers();
  }

  fetchProjectDetail() {
    this.projectsService.getProjectDetail(this.projectId).subscribe((res) => {
      this.projectDetail = res;
    });
  }

  fetchProjectMembers() {
    this.membersService.listProjectMembers(this.projectId).subscribe((res) => {
      this.projectMembers = res;
    });
  }

  fetchProjectTasks() {
    this.tasksService.getProjectTasks(this.projectId).subscribe((res) => {
      this.projectTasks = res;
      // Calculate new pie chart data based on fetched tasks
      const newData: ChartDataset[] = [
        {
          data: [
            res.filter((task: ITask) => task.status === 'TODO').length,
            res.filter((task: ITask) => task.status === 'INPROGRESS').length,
            res.filter((task: ITask) => task.status === 'TESTING').length,
            res.filter((task: ITask) => task.status === 'DONE').length,
          ],
          backgroundColor: [
            'rgb(163 230 53)',
            'rgb(250 204 21)',
            'rgb(192 132 252)',
            'rgb(74 222 128)',
          ],
        },
      ];

      // Call updateChartData method of pie chart component
      this.pieChartComponent.updateChartData(newData);
    });
  }

  fetchAvailableUsers() {
    this.usersService.getAvailableUsers(this.projectId).subscribe((res) => {
      this.availableUsers = res;
    });
  }

  addSelectedUsersIntoProject() {
    const req = this.selectedUsers.map((userId: string) => {
      let mapItem: ReqMember = {
        projectId: this.projectId,
        userId: userId,
      };
      return mapItem;
    });
    this.membersService.addMember(req).subscribe((res) => {
      this.selectedUsers = [];
      this.fetchProjectMembers();
      this.fetchAvailableUsers();
    });
  }

  showPopupDeleteMember(data: IMember) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: data?.user?.username + ' - ' + data?.user?.email,
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.membersService.deleteMember(data.id).subscribe((res) => {
          this.fetchProjectMembers();
          this.fetchAvailableUsers();
        });
      }
    });
  }
}
