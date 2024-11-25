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
  imports: [FormsModule, InputBoxComponent, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  public error: ErrorInterface | null = null;
  public userNameError = '';
  public passwordError = '';
  public password2Error = '';
  public emailError = '';
  public user: User = {
    id: '',
    name: '',
    email: '',
    username: '',
    password: '',
  };
  public confirmPassword = '';

  constructor(private loginServices: LoginServices) {}

  registerUser() {
    this.limpiarErrores();

    if (this.camposVacíos()) {
      return;
    }

    if (this.user.password !== this.confirmPassword) {
      this.password2Error = 'No coinciden las contraseñas, comprueba que sean iguales'
      return;
    }

    this.loginServices.register(this.user).subscribe({
      next: () => {
        this.loginServices.login(this.user).subscribe({
          next: (element) => {
            this.loginServices.saveToken(element);
          },
          error: (error) => {
            this.error = error;
          },
        });
      },
      error: (error) => {
        this.error = error;
      },
    });
  }

  limpiarErrores() {
    this.error = null;
    this.userNameError = '';
    this.passwordError = '';
    this.password2Error = '';
    this.emailError = '';
  }

  camposVacíos() {
    let bolean = false;

    if (
      this.user.username === '' ||
      this.user.password === '' ||
      this.user.email === '' ||
      this.confirmPassword === ''
    ) {
      if (this.user.username === '') {
        this.userNameError =
          'El campo username es obligatorio, introduce un nombre de usuario';
      }
      if (this.user.password === '') {
        this.passwordError =
          'La contraseña es obligatorio, introduce una contraseña';
      }
      if (this.user.email === '') {
        this.emailError = 'El campo email es obligatorio, introduce un email';
      }
      if (this.confirmPassword === '') {
        this.password2Error =
          'La contraseña es obligatorio, introduce una contraseña';
      }
      bolean = true;
    }

    return bolean;
  }
}
