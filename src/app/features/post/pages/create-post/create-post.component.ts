import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { MentorpostService } from '../../services/mentorpost.service';
import { MarkdownModule } from 'ngx-markdown';
import { ImageService } from '../../../../shared/services/image.service';
import { getDownloadURL } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule, RouterLink, MarkdownModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  mentorPostService = inject(MentorpostService);
  imageService = inject(ImageService);
  router = inject(Router);
  toastr = inject(ToastrService)

  imageTypeError: boolean = false;
  imageSizeError: boolean = false;
  isUploadingImage: boolean = false;

  createPostForm = new FormGroup({
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
        this.createPostForm.getRawValue().profileImageUrl,
        this.createPostForm.getRawValue().status,
    );
    //alert('Mentor Saved Successfully');
    this.createPostForm.reset();
    this.router.navigateByUrl('/dashboard');
    this.toastr.success('Mentor Saved Successfully', 'Success');
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

    this.isUploadingImage = true; // Start loading

    this.imageService.uploadImage(file.name, file).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((downLoadUrl)=>{

        this.createPostForm.patchValue({
          profileImageUrl: downLoadUrl
        });

        // alert('Image upload succesfully');
        this.toastr.success('Image upload succesfully', 'Success');
        this.isUploadingImage = false; // Stop loading
      }).catch(() => {
        this.isUploadingImage = false; // Stop loading on error
      });
    }).catch(() => {
      this.isUploadingImage = false; // Stop loading on error
    });
  }
}
