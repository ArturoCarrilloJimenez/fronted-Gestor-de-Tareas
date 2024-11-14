import { Routes } from '@angular/router';
import { HomePageComponent } from './tasks/pages/home-page/home-page.component';
import { EditTaskPageComponent } from './tasks/pages/edit-task-page/edit-task-page.component';
import { LoginPageComponent } from './login/pages/login-page/login-page.component';
import { RegisterPageComponent } from './login/pages/register-page/register-page.component';
import { LoginGuard } from './guard/LoginGuard.guard';
import { AuthGuard } from './guard/AuthGuard.guard';

export const routes: Routes = [
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    component: HomePageComponent,
  },
  {
    path: 'tasks/:id',
    canActivate: [AuthGuard],
    component: EditTaskPageComponent
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginPageComponent
  },
  {
    path: 'register',
    canActivate: [LoginGuard],
    component: RegisterPageComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
