import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TaskCardComponent } from '../../../common/ui-blocks/task-card/task-card.component';
import { CommonModule, NgFor } from '@angular/common';
import { ITask } from '../../../models/interface/task.interface';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ReqTask,
  ReqTaskQuery,
  ReqUpdateTask,
} from '../../../models/dto/task.dto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IMember } from '../../../models/interface/member.interface';
import { MembersService } from '../../../services/members.service';
import AppConstants from '../../../common/constant/app-constants';
import { DeleteDialogComponent } from '../../../common/ui-blocks/delete-dialog/delete-dialog.component';
import { TaskDialogComponent } from '../../../common/ui-blocks/task-dialog/task-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-board-tab',
  standalone: true,
  imports: [
    TaskCardComponent,
    NgFor,
    MatButtonModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './project-board-tab.component.html',
  styleUrl: './project-board-tab.component.css',
})
export class ProjectBoardTabComponent implements OnInit {
  public kabanBoard: any[] = [];
  public projectId: string;
  public currentItem: ITask;
  public projectMembers: IMember[] = [];
  public searchQuery: ReqTaskQuery = {
    searchKeyword: '',
    category: [],
    status: [],
    members: [],
    priority: [],
  };
  public searchQueryForm: FormGroup;
  public appConstants = AppConstants;

  constructor(
    public tasksService: TasksService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public membersService: MembersService
  ) {
    this.projectId = this.route.snapshot.params['id'];
    this.initForm();
  }
  ngOnInit(): void {
    this.fetchProjectMembers();
    this.onSearch();
  }

  initForm() {
    this.searchQueryForm = new FormGroup({
      searchKeyword: new FormControl(''),
      category: new FormControl(['']),
      status: new FormControl(['']),
      members: new FormControl(['']),
      priority: new FormControl(['']),
    });
  }

  fetchProjectTasks() {
    this.tasksService
      .getProjectTasks(this.projectId, this.searchQuery)
      .subscribe((res: ITask[]) => {
        const groupedTasks = res.reduce((acc: any, task: any) => {
          if (!acc[task.status]) {
            acc[task.status] = [];
          }
          acc[task.status].push(task);
          return acc;
        }, {});

        const sortedStatuses = Object.keys(groupedTasks).sort(); // Sort the status keys

        const result = sortedStatuses.map((status) => ({
          status,
          tasks: groupedTasks[status],
        }));
        this.kabanBoard = result;
      });
  }

  fetchProjectMembers() {
    this.membersService.listProjectMembers(this.projectId).subscribe((res) => {
      this.projectMembers = res;
    });
  }

  onDragStart(item: ITask) {
    this.currentItem = item;
  }

  onDrop(e: any, status: string) {
    const req: ReqUpdateTask = JSON.parse(JSON.stringify(this.currentItem));
    req.status = status;
    this.tasksService.updateTask(req).subscribe((res) => {
      this.onSearch();
    });
  }

  onDragOver(e: any) {
    e.preventDefault();
  }

  onSearch() {
    this.searchQuery.searchKeyword =
      this.searchQueryForm.get('searchKeyword')?.value;
    this.searchQuery.category = this.searchQueryForm.get('category')?.value;
    this.searchQuery.status = this.searchQueryForm.get('status')?.value;
    this.searchQuery.members = this.searchQueryForm.get('members')?.value;
    this.searchQuery.priority = this.searchQueryForm.get('priority')?.value;
    this.fetchProjectTasks();
  }

  onClear() {
    this.searchQueryForm.reset();
  }

  openDialog(data?: ITask) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        taskInfo: {
          id: data?.id,
          title: data?.title || '',
          description: data?.description || '',
          assignee: data?.assignee || '',
          priority: data?.priority || 'Lowest',
          dueDate: data?.dueDate || new Date(),
          startDate: data?.startDate || new Date(),
          category: data?.category || 'Feature',
          status: data?.status || 'TODO',
        },
        projectMembers: this.projectMembers,
      },
    });

    dialogRef.afterClosed().subscribe((result: ITask) => {
      if (result) {
        if (result.id) {
          const req: ReqUpdateTask = result;
          this.tasksService.updateTask(req).subscribe(() => {
            this.onSearch();
          });
        } else {
          const req: ReqTask = result;
          this.tasksService.createTask(req).subscribe(() => {
            this.onSearch();
          });
        }
      }
    });
  }

  openDeleteDialog(data: ITask) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: data?.title,
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.tasksService.deleteTask(data.id).subscribe((res) => {
          this.onSearch();
        });
      }
    });
  }
}
