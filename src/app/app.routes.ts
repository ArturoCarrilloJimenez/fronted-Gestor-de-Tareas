import { Routes } from '@angular/router';
import { HomePageComponent } from './tasks/pages/home-page/home-page.component';
import { EditTaskPageComponent } from './tasks/pages/edit-task-page/edit-task-page.component';
import { LoginPageComponent } from './login/pages/login-page/login-page.component';
import { RegisterPageComponent } from './login/pages/register-page/register-page.component';

export const routes: Routes = [
  {
    path: 'tasks',
    component: HomePageComponent,
  },
  {
    path: 'tasks/:id',
    component: EditTaskPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: '**',
    redirectTo: 'tasks'
  }
];
