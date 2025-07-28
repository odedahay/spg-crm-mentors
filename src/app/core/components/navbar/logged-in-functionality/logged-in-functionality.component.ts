import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logged-in-functionality',
  imports: [RouterLink],
  templateUrl: './logged-in-functionality.component.html',
  styleUrl: './logged-in-functionality.component.css'
})
export class LoggedInFunctionalityComponent {
  navBarService = inject(NavbarService);
  eRef = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event){
    if(!this.eRef.nativeElement.contains(event.target)){
      this.navBarService.closeUserMenu();
    }
  }
}
