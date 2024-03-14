import { NgIf, CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ITask } from '../../../models/interface/task.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import AppConstants from '../../constant/app-constants';
import { IMember } from '../../../models/interface/member.interface';
import { MembersService } from '../../../services/members.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    CommonModule,
    MatDatepickerModule,
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css',
})
export class TaskDialogComponent implements OnInit {
  public taskForm: FormGroup;
  public appConstants = AppConstants;
  public projectMembers: IMember[] = [];
  public projectId: string;
  public taskInfo: ITask = {
    id: '',
    title: '',
    description: '',
    assignee: '',
    priority: 'Lowest',
    dueDate: new Date(),
    startDate: new Date(),
    category: 'Feature',
    status: 'TODO',
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

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { taskInfo: ITask; projectMembers: IMember[] },
    public membersService: MembersService
  ) {
    this.projectMembers = data.projectMembers;
    this.taskInfo = { ...data.taskInfo };
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.taskForm = new FormGroup({
      title: new FormControl(this.taskInfo.title, [Validators.required]),
      description: new FormControl(this.taskInfo.description, [
        Validators.required,
      ]),
      assignee: new FormControl(this.taskInfo.assignee, [Validators.required]),
      priority: new FormControl(this.taskInfo.priority, [Validators.required]),
      dueDate: new FormControl(this.taskInfo.dueDate, [Validators.required]),
      startDate: new FormControl(this.taskInfo.startDate, [
        Validators.required,
      ]),
      category: new FormControl(this.taskInfo.category, [Validators.required]),
      status: new FormControl(this.taskInfo.status, [Validators.required]),
    });
  }

  get cpf() {
    return this.taskForm.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  acceptBtnClick() {
    const isValid = this.taskForm.valid;
    if (isValid) {
      this.taskInfo.title = this.taskForm.get('title')?.value;
      this.taskInfo.description = this.taskForm.get('description')?.value;
      this.taskInfo.assignee = this.taskForm.get('assignee')?.value;
      this.taskInfo.priority = this.taskForm.get('priority')?.value;
      this.taskInfo.dueDate = this.taskForm.get('dueDate')?.value;
      this.taskInfo.startDate = this.taskForm.get('startDate')?.value;
      this.taskInfo.category = this.taskForm.get('category')?.value;
      this.taskInfo.status = this.taskForm.get('status')?.value;
      this.dialogRef.close(this.taskInfo);
    }
  }
}
