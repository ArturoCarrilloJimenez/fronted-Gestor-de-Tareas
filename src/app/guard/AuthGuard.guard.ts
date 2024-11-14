import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Obtengo el token

    // Si no se ha logeado lo redirige a login y si no devuelvo true
    if (!token) {
      this.router.navigateByUrl('login');
      return false;
    }

    return true;
  }
}
