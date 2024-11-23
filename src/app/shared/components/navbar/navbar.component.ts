import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginServices } from '../../../login/services/login.service';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor (private loginService : LoginServices) {}

  get isLogin() {
    return localStorage.getItem('token') ? true : false
  }

  logout() {
    this.loginService.logout()
  }
}
