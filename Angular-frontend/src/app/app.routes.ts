import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';

export const routes: Routes = [
  { path: 'login', title: 'Login', component: LoginComponent },
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: DefaultLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '', // child route path
        title: 'Dashboard',
        component: DashboardComponent, // child route component that the router renders
      },
      {
        path: 'project/:id',
        title: 'Project Detail',
        component: ProjectDetailComponent,
      },
    ],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }, // Handle 404
];
