import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginServices {
  private URL: string = 'http://localhost:8000';

  constructor(private http: HttpClient, private router: Router) {}

  // Hace una petición y espera un token de JWT
  login(user: User): Observable<string> {
    const url = `${this.URL}/login`;
    return this.http.post<string>(url, user).pipe(
      catchError((error) => {
        return throwError(() => error.error || { detail: 'Error desconocido' });
      })
    );
  }

  saveToken(element: string) {
    localStorage.setItem('token', element);
        this.router.navigateByUrl('tasks');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }

  register(user: User): Observable<User> {
    const url = `${this.URL}/users/add`;
    return this.http.post<User>(url, user).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error || { detail: 'Error desconocido' });
      })
    );
  }
}
