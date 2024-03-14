import { Component, Inject, OnInit } from '@angular/core';
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
import AppConstants from '../../constant/app-constants';
import { MatSelectModule } from '@angular/material/select';
import { IProject } from '../../../models/interface/project.interface';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-project-dialog',
  standalone: true,
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
  ],
  templateUrl: './project-dialog.component.html',
  styleUrl: './project-dialog.component.css',
})
export class ProjectDialogComponent implements OnInit {
  public projectForm: FormGroup;
  public appConstants = AppConstants;
  constructor(
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: IProject = {
      id: '',
      title: '',
      description: '',
      projectCode: '',
      status: '',
    }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.projectForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      projectCode: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  get cpf() {
    return this.projectForm.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  acceptBtnClick(data: IProject) {
    const isValid = this.projectForm.valid;
    if (isValid) {
      this.dialogRef.close(data);
    }
  }
}
