import { Component } from '@angular/core';
import { AppComponent } from "../../../app.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [AppComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
login() {
throw new Error('Method not implemented.');
}

}
