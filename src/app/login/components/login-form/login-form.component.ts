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
  imports: [FormsModule ,CommonModule, InputBoxComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  @Output()
  public emitter: EventEmitter<boolean> = new EventEmitter();

  constructor(private loginServices: LoginServices) {}

  public error: ErrorInterface | null = null;

  public user: User = {
    id: '',
    name: '',
    email: '',
    username: '',
    password: ''
  };

  // TODO hacer el login para optener el jws
  loginUser() {
    if ((this.user.username === '') || (this.user.password === '')) {
      this.error = {detail: 'Algún campo esta vació'}
    }
    this.loginServices.login(this.user)
  }
}
