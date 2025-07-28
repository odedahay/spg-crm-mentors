import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  userService = inject(UserService);
  router = inject(Router)
  toastr = inject(ToastrService);
  errorMessage = signal<string | undefined>(undefined);
  
    constructor(){
      // call the Userservice
      this.userService.logout()
        .subscribe({
          next: ()=>{
            this.userService.currentUser.set(undefined);
            this.router.navigateByUrl('/login');
            this.toastr.success('Successfully Logout');
          }
        })
    }
}
