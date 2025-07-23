import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  createPostForm = new FormGroup({
    firstname: new FormControl<string>('', { nonNullable: true }),
    lastname: new FormControl<string>('', { nonNullable: true}),
    program: new FormControl<string>('', { nonNullable: true}),
    numOfMentor: new FormControl<Number>(0, { nonNullable: true}),
    note: new FormControl<string>('', { nonNullable: false}),
    status: new FormControl<string>('', {nonNullable: true})
  });
}
