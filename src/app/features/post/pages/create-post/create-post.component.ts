import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  createPostForm = new FormGroup({
    firstname: new FormControl<string>('', { nonNullable: true, validators:[Validators.required] }),
    lastname: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', {nonNullable: true, validators: [Validators.required,Validators.email]}),
    phoneNumber: new FormControl<string>('', {nonNullable: false}),
    program: new FormControl<string>('', { nonNullable: true, validators: [Validators.required]}),
    numOfMentor: new FormControl<Number>(0, { nonNullable: true, validators: [Validators.required]}),
    note: new FormControl<string>('', { nonNullable: false, validators: [Validators.maxLength(2000)]}),
    status: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]})
  });

  get firstname(){
    return this.createPostForm.controls.firstname
  }
  get lastname(){
    return this.createPostForm.controls.lastname
  }

  get email(){
    return this.createPostForm.controls.email
  }

  get program(){
    return this.createPostForm.controls.program
  }

  get numOfMentor(){
    return this.createPostForm.controls.numOfMentor
  }

  get note(){
    return this.createPostForm.controls.note
  }

  get status(){
    return this.createPostForm.controls.status
  }

  onFormSubmit(){
    console.log(this.createPostForm.value);
  }
}
