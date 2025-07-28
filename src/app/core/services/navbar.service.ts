import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  hideUserMenu = signal(true);

  constructor() { }

  toggleNavbarMenu(){
    this.hideUserMenu.set(!this.hideUserMenu())
  }

  closeUserMenu(){
    this.hideUserMenu.set(true);
  }
}
