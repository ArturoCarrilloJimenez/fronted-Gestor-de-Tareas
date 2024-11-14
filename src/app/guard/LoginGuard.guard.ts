import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Obtengo el token

    // Si se ha logeado lo redirige a tareas y si no devuelvo true
    if (token) {
      this.router.navigateByUrl('tasks');
      return false;
    }

    return true;
  }
}
