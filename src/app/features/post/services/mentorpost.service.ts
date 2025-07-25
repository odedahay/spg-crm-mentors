import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, setDoc, query, orderBy, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MentorPost } from '../models/mentorpost.model';

@Injectable({
  providedIn: 'root'
})
export class MentorpostService {

  constructor() { }

  firestore = inject(Firestore);

  createMentorPost(
    firstname:string,
    lastname: string,
    email: string,
    phoneNumber: string,
    program:string,
    numOfMentor: number,
    note: string,
    profileImageUrl: string,
    status: string,
  ){
    // addDoc
    // Firebase define ID
    const postCollectionReference = collection(this.firestore, 'mentor-post');
    addDoc(postCollectionReference, {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phoneNumber: phoneNumber,
      program: program,
      numOfMentor: numOfMentor,
      note: note,
      profileImageUrl: profileImageUrl,
      status:status,
      publishedOn: new Date(),
    })

    // setDoc
    // if you want to define your own ID
    // const postCollectionReference = doc(this.firestore, 'mentor-post', 'this-is-a-slug-123');
    // setDoc(postCollectionReference, {
    //   firstname: this.createPostForm.value.firstname,
    //   lastname: this.createPostForm.value.lastname,
    //   email: this.createPostForm.value.email,
    //   phoneNumber: this.createPostForm.value.phoneNumber,
    //   program: this.createPostForm.value.program,
    //   numOfMentor: this.createPostForm.value.numOfMentor,
    //   note: this.createPostForm.value.note,
    //   status:this.createPostForm.value.status,
    //   publishedOn: new Date(),
    // })
  }

  // Update Method
  updateMentorPost(
    id: string,
    firstname:string,
    lastname: string,
    email: string,
    phoneNumber: string,
    program:string,
    numOfMentor: number,
    note: string,
    profileImageUrl: string,
    status: string,
  ){
    // setDoc - define your own ID
    const postCollectionReference = doc(this.firestore, 'mentor-post', id);
    setDoc(postCollectionReference, {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phoneNumber: phoneNumber,
      program: program,
      numOfMentor: numOfMentor,
      note: note,
      profileImageUrl: profileImageUrl,
      status:status,
      publishedOn: new Date(),
    });
  }

  // Return collection
  getMentorPosts(): Observable<MentorPost[]> {
    const mentorPostCollectionRef = collection(this.firestore, 'mentor-post');
    const q = query(mentorPostCollectionRef, orderBy('publishedOn', 'desc'));
    
    return collectionData(q, { idField: 'id' }) as Observable<MentorPost[]>;
  }

  // Return Single Data
  getMentorPostById(id: string): Observable<MentorPost>{
    const mentorPostDocumentRef = doc(this.firestore, 'mentor-post', id);

    return docData(mentorPostDocumentRef, {
      idField: 'id'
    }) as Observable<MentorPost>;
  }
}
