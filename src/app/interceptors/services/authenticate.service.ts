import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../login/interfaces/user';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  private URL: string = 'http://localhost:8000';

  constructor(private http: HttpClient, private router: Router) {}

  verifyToken(): Observable<string> {
    const url = `${this.URL}/verify/token`;
    return this.http.post<User>(url, {}).pipe(
      map((resp) => resp.id),
      // Obtengo los errores
      catchError((error) => {
        // Elimino el token del local storage y lo redirige a login
        localStorage.removeItem('token');
        this.router.navigateByUrl('login');
        // Retorno el error
        return throwError(() => error);
      })
    );
  }

  getUserId(): string {
    let userId = '';

    this.verifyToken().subscribe((id) => {
      userId = id;
    });

    return userId;
  }
}
