import { Component, ElementRef, HostListener, inject, input } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';
import { RouterLink } from '@angular/router';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-logged-in-functionality',
  imports: [RouterLink],
  templateUrl: './logged-in-functionality.component.html',
  styleUrl: './logged-in-functionality.component.css'
})
export class LoggedInFunctionalityComponent {
  navBarService = inject(NavbarService);
  eRef = inject(ElementRef);

  user = input.required<User>();

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event){
    if(!this.eRef.nativeElement.contains(event.target)){
      this.navBarService.closeUserMenu();
    }
  }
}
