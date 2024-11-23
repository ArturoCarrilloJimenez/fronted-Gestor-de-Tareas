import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})

export class RegisterPageComponent {

}
