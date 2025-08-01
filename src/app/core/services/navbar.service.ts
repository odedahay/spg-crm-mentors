import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  hideUserMenu = signal(true);
  showSidebar = signal(true);

  constructor() { }

  // User Menu
  toggleNavbarMenu(){
    this.hideUserMenu.set(!this.hideUserMenu())
  }

  closeUserMenu(){
    this.hideUserMenu.set(true);
  }

  // Sidebar
  toggleSidebar(){
    this.showSidebar.set(!this.showSidebar())
  }

  closeSidebar(){
    this.showSidebar.set(true);
  }
}
