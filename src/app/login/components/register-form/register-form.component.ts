import { Component } from '@angular/core';
import { InputBoxComponent } from '../../../shared/components/input-box/input-box.component';
import { CommonModule } from '@angular/common';
import { ErrorInterface } from '../../../tasks/interfaces/error';
import { User } from '../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { LoginServices } from '../../services/login.service';

@Component({
  selector: 'login-register-form',
  standalone: true,
  imports: [FormsModule ,InputBoxComponent, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})

export class RegisterFormComponent {
  constructor(private loginServices: LoginServices) {}

  public error: ErrorInterface | null = null;

  public user: User = {
    id: '',
    name: '',
    email: '',
    username: '',
    password: ''
  };

  public confirmPassword = ''

  registerUser() {
      if (this.user.username === '' || this.user.password === '' || this.user.email === '' || this.confirmPassword === '') {
        this.error = {detail: 'Algunos de los campos obligatorios están vacíos'}
        return
      }

      if (this.user.password !== this.confirmPassword) {
        this.error = {detail: 'No coinciden las contraseñas'}
        return
      }

      this.loginServices.register(this.user).subscribe({
        next: () => {
          this.loginServices.login(this.user).subscribe({
            next: (element) => {
              this.loginServices.saveToken(element)
            },
            error: (error) => {
              this.error = error
            }
          })
        },
        error: (error) => {
          this.error= error
        }
      })

  }
}
