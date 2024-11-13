import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../login/interfaces/user';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private URL: string = 'http://localhost:8000';

  constructor(private http: HttpClient) { }


  verifyToken(): Observable<string> {
    const url = `${this.URL}/verify/token`;
    return this.http.post<User>(url, {}).pipe(
      map((resp) => resp.id)
    );
  }
}
