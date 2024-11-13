import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

// TODO hacer servicio de login y registro
@Injectable({ providedIn: 'root' })
export class LoginServices {
  private URL: string = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  login(user: User) {
    const url = `${this.URL}/login`;
    this.http.post<string>(url, user).subscribe((element) => {
      localStorage.setItem('token', element)
    })
  }
}
