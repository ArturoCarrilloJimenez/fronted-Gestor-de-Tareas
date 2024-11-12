import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { catchError, throwError } from 'rxjs';

// TODO hacer servicio de login y registro
@Injectable({ providedIn: 'root' })
export class LoginServices {
  private URL: string = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  // TODO hacer la sesión con jws
  login(user: User) {
    const url = `${this.URL}/login`;
    this.http.post(url, user).subscribe((elemet) => console.log(elemet));
  }
}
