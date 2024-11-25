import { Component, EventEmitter, Output } from '@angular/core';
import { InputBoxComponent } from '../../../shared/components/input-box/input-box.component';
import { ErrorInterface } from '../../../tasks/interfaces/error';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { LoginServices } from '../../services/login.service';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [FormsModule, CommonModule, InputBoxComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  @Output()
  public emitter: EventEmitter<boolean> = new EventEmitter();

  public error: ErrorInterface | null = null;
  public userNameError = '';
  public passwordError = '';
  public user: User = {
    id: '',
    name: '',
    email: '',
    username: '',
    password: '',
  };

  constructor(private loginServices: LoginServices) {}

  loginUser() {
    this.limpiarErrores();

    if (this.camposVaciaos()) {
      return;
    }

    this.loginServices.login(this.user).subscribe({
      next: (element) => {
        this.loginServices.saveToken(element);
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
  }

  camposVaciaos() {
    let bolean = false;

    if (this.user.username === '' || this.user.password === '') {
      if (this.user.username === '') {
        this.userNameError =
          'El campo username es obligatorio, introduce un nombre de usuario';
      }
      if (this.user.password === '') {
        this.passwordError =
          'La contraseña es obligatorio, introduce una contraseña';
      }
      bolean = true;
    }

    return bolean;
  }
}
