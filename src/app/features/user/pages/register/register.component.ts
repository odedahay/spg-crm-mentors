import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userService = inject(UserService);
  toastr = inject(ToastrService);
  errorMessage = signal<string | undefined>(undefined);

  registerForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
    })
  });

  get emailControl(){
    return this.registerForm.controls.email;
  }

  get passwordControl(){
    return this.registerForm.controls.password;
  }

  onFormSubmit(){
    if(this.registerForm.invalid){
      return;
    }
    const rawForm = this.registerForm.getRawValue();
    this.userService.register(rawForm.email, rawForm.password).subscribe({
      next: ()=>{
        // Redirect to login page
        this.toastr.success("Successfully Register", "Success");
      },error:(error)=>{
        console.error(error.message);
        const cleanedMessage = error.message.replace(/^Firebase:\s*/i, '').trim();

        this.toastr.error(cleanedMessage, 'Error');
        this.errorMessage.set(cleanedMessage);
      }
    });
  }

}
