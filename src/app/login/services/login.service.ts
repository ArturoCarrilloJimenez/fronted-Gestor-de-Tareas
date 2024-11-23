import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

// TODO hacer servicio de login y registro
@Injectable({ providedIn: 'root' })
export class LoginServices {
  private URL: string = 'http://localhost:8000';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: User) {
    const url = `${this.URL}/login`;
    this.http.post<string>(url, user).subscribe((element) => {
      localStorage.setItem('token', element)
      this.router.navigateByUrl('tasks')
    })
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigateByUrl('login')
  }
}
