import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router';
import { MentorpostService } from '../../services/mentorpost.service';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule, RouterLink, MarkdownModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  mentorPostService = inject(MentorpostService);

  createPostForm = new FormGroup({
    firstname: new FormControl<string>('', { nonNullable: true, validators:[Validators.required] }),
    lastname: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', {nonNullable: true, validators: [Validators.required,Validators.email]}),
    phoneNumber: new FormControl<string>('', {nonNullable: true}),
    program: new FormControl<string>('', { nonNullable: true, validators: [Validators.required]}),
    numOfMentor: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required]}),
    note: new FormControl<string>('', { nonNullable: true, validators: [Validators.maxLength(2000)]}),
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
    if(this.createPostForm.invalid){
      return;
    }

    this.mentorPostService.createMentorPost(
        this.createPostForm.getRawValue().firstname,
        this.createPostForm.getRawValue().lastname,
        this.createPostForm.getRawValue().email,
        this.createPostForm.getRawValue().phoneNumber,
        this.createPostForm.getRawValue().program,
        this.createPostForm.getRawValue().numOfMentor,
        this.createPostForm.getRawValue().note,
        this.createPostForm.getRawValue().status,
    )
  }
}
