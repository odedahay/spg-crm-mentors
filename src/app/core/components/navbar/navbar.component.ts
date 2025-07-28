import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoggedOutFunctionalityComponent } from './logged-out-functionality/logged-out-functionality.component';
import { LoggedInFunctionalityComponent } from './logged-in-functionality/logged-in-functionality.component';
import { User as FireAuthUser } from '@angular/fire/auth';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LoggedOutFunctionalityComponent, LoggedInFunctionalityComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userService = inject(UserService);

  constructor() {
    this.userService.user$.subscribe({
      next: (user: FireAuthUser | null) => {

        if (user) {
          const applicationUser: User = {
            email: user.email!,
            id: user.uid
          };

          this.userService.currentUser.set(applicationUser);
        }
      }
    })
  }
}
