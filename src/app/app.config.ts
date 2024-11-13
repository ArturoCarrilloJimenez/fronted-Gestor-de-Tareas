import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TaskService } from './tasks/services/task.service';
import { LoginServices } from './login/services/login.service';
import { authInterceptor } from './interceptors/auth.interceptor';
import { SweetalertService } from './shared/services/sweetalert.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    ),
    TaskService,
    LoginServices,
    SweetalertService
  ]
};
