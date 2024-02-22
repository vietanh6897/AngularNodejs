import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../models/interface/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../../common/ui-blocks/project-dialog/project-dialog.component';
import { IProject } from '../../models/interface/project.interface';
import { ProjectsService } from '../../services/projects.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthService } from '../../services/auth.service';
import { ReqProject } from '../../models/dto/project.dto';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    MatProgressSpinnerModule,
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.css',
})
export class DefaultLayoutComponent implements OnInit {
  public userInfo: IUser = {
    id: '',
    username: '',
    email: '',
  };
  constructor(
    public loadingService: LoadingService,
    public usersService: UsersService,
    public projectsService: ProjectsService,
    private router: Router,
    public dialog: MatDialog,
    private localStore: LocalStorageService,
    private changeDetector: ChangeDetectorRef,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.getUserInfo(localStorage.getItem('userId') || '');
  }

  getUserInfo(userId: string) {
    this.usersService.getUserInfo(userId).subscribe((res) => {
      this.userInfo = res;
      this.localStore.saveData('userInfo', JSON.stringify(this.userInfo));
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      data: {
        id: '',
        title: '',
        description: '',
        projectCode: '',
        status: 'OPENED',
      },
    });

    dialogRef.afterClosed().subscribe((result: IProject) => {
      if (result) {
        const req: ReqProject = {
          title: result.title,
          description: result.description,
          projectCode: result.projectCode,
          status: result.status,
        };
        this.projectsService.createProject(req).subscribe((res) => {
          this.projectsService.projectHasChanged$$.next(true);
          this.router.navigate(['/dashboard']);
        });
      }
    });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  logout(): void {
    // Call your authentication service logout method
    this.authService.logout().subscribe((res) => {
      this.localStore.clearData();
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}
