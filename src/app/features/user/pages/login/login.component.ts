import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userService = inject(UserService)
  router = inject(Router);
  toastr = inject(ToastrService);
  errorMessage = signal<string | undefined>(undefined);

  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
    })
  })

  get emailControl() {
    return this.loginForm.controls.email;
  }

  get passwordControl() {
    return this.loginForm.controls.password;
  }


  onFormSubmit() {
    if (this.loginForm.invalid) return;

    const rawForm = this.loginForm.getRawValue();

    this.userService.login(rawForm.email, rawForm.password)
      .subscribe({
        next: (user) => {

          // store the currently loggin user (signal)
          this.userService.currentUser.set(user)

          //Redirect the user to home page
          this.router.navigateByUrl('/dashboard');
          this.toastr.success('Successfully login', 'Success');
        },
        error: (error) => {
          console.error(error.message);
          this.errorMessage.set(error.message);
        }
    });
  }

}
