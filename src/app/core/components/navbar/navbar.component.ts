import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoggedOutFunctionalityComponent } from './logged-out-functionality/logged-out-functionality.component';
import { LoggedInFunctionalityComponent } from './logged-in-functionality/logged-in-functionality.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LoggedOutFunctionalityComponent, LoggedInFunctionalityComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userService = inject(UserService);
}
