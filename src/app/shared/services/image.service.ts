import { inject, Injectable } from '@angular/core';
import { ref, Storage, uploadBytesResumable, UploadTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  firebaseStorage = inject(Storage);

  uploadImage(imageName: string, image: File): UploadTask{
    const storageRef = ref(this.firebaseStorage, `images/${imageName}`);

    return uploadBytesResumable(storageRef, image);
  }
}
