import { Component, inject, input, OnInit } from '@angular/core';
import { MentorpostService } from '../../services/mentorpost.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { ImageService } from '../../../../shared/services/image.service';
import { getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-post',
  imports: [RouterLink, ReactiveFormsModule, MarkdownModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit{

  mentorPostService = inject(MentorpostService);
  imageService = inject(ImageService);
  
  id = input<string | undefined>(undefined);

  imageTypeError: boolean = false;
  imageSizeError: boolean = false;

  ngOnInit(): void {
    this.mentorPostService.getMentorPostById(this.id() ?? '')
    .subscribe({
      next: (mentorPost) => {
        this.editPostForm.patchValue({
          id: mentorPost.id,
          firstname: mentorPost.firstname,
          lastname: mentorPost.lastname,
          email: mentorPost.email,
          phoneNumber: mentorPost.phoneNumber,
          program: mentorPost.program,
          numOfMentor: mentorPost.numOfMentor,
          note: mentorPost.note,
          profileImageUrl: mentorPost.profileImageUrl,
          status: mentorPost.status
        });
      }
    })
  }

  editPostForm = new FormGroup({
    id: new FormControl<string>('', { nonNullable: true, validators:[Validators.required] }),
    firstname: new FormControl<string>('', { nonNullable: true, validators:[Validators.required] }),
    lastname: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', {nonNullable: true, validators: [Validators.required,Validators.email]}),
    phoneNumber: new FormControl<string>('', {nonNullable: true}),
    program: new FormControl<string>('', { nonNullable: true, validators: [Validators.required]}),
    numOfMentor: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required]}),
    note: new FormControl<string>('', { nonNullable: true, validators: [Validators.maxLength(3000)]}),
    profileImageUrl: new FormControl<string>('assets/images/default-avatar.png', { nonNullable: true}),
    status: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]})
  });

  get firstname(){
    return this.editPostForm.controls.firstname
  }
  get lastname(){
    return this.editPostForm.controls.lastname
  }

  get email(){
    return this.editPostForm.controls.email
  }

  get program(){
    return this.editPostForm.controls.program
  }

  get numOfMentor(){
    return this.editPostForm.controls.numOfMentor
  }

  get note(){
    return this.editPostForm.controls.note
  }

  get status(){
    return this.editPostForm.controls.status
  }

  onProfileImageSelected(input: HTMLInputElement){
    if(!input.files || input.files.length <= 0){
      return;
    }

    const file: File = input.files[0]
    const validTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/bmp',
      'image/svg+xml',
      'image/x-icon',
      'image/heic',
      'image/heif'
    ];
    if (!validTypes.includes(file.type)) {

      this.imageTypeError = true;
      input.value = '';

      return;

    } else {
      
      this.imageTypeError = false;
    
    }

    // File size validation (2MB max)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    if (file.size > maxSize) {
      this.imageSizeError = true;
      input.value = '';
    
      return;
    
    } else {
    
      this.imageSizeError = false;
    
    }

    this.imageService.uploadImage(file.name, file).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((downLoadUrl)=>{

        this.editPostForm.patchValue({
          profileImageUrl: downLoadUrl
        });

        alert('Image upload succesfully');
      })
    })
  }

  onFormSubmit(){

  }
  
}
