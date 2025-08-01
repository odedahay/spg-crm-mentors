import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, setDoc, query, orderBy, doc, docData, deleteDoc, Timestamp } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { MentorPost } from '../models/mentorpost.model';
import { UserService } from '../../../core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class MentorpostService {

  constructor() { }

  firestore = inject(Firestore);
  userService = inject(UserService);

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
    createdAt: string,
    followUpInterval: number,
  ){
    // addDoc
    // Firebase define ID
    const postCollectionReference = collection(this.firestore, 'mentor-post');

    const currentDate = new Date();
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
      createdAt: createdAt,
      followUpInterval: followUpInterval,
      publishedOn: currentDate, // Set creation date for new posts
      lastUpdated: currentDate, // Set initial lastUpdated to same as publishedOn for new posts
      userId: this.userService.currentUser()?.id
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
    createdAt: string,
    followUpInterval: number,
    publishedOn: Timestamp | Date | any // Keep the original publishedOn date
  ){
    // setDoc - define your own ID
    const postCollectionReference = doc(this.firestore, 'mentor-post', id);
    
    // Ensure publishedOn is properly preserved as a Firestore-compatible date
    let preservedPublishedOn = publishedOn;
    if (publishedOn instanceof Timestamp) {
      // If it's already a Timestamp, keep it as is
      preservedPublishedOn = publishedOn;
    } else if (publishedOn instanceof Date) {
      // If it's a Date, keep it as is (Firestore will convert it)
      preservedPublishedOn = publishedOn;
    } else if (typeof publishedOn === 'string') {
      // If it's a string, convert to Date
      preservedPublishedOn = new Date(publishedOn);
    } else {
      // Fallback to current date if something goes wrong
      preservedPublishedOn = new Date();
    }

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
      createdAt: createdAt,
      followUpInterval: followUpInterval,
      publishedOn: preservedPublishedOn, // Preserve original creation date with proper type
      lastUpdated: new Date(), // Only update the lastUpdated field
      userId: this.userService.currentUser()?.id
    });
  }

  // Return collection
  getMentorPosts(): Observable<MentorPost[]> {
    const mentorPostCollectionRef = collection(this.firestore, 'mentor-post');
    // Order by lastUpdated if it exists, otherwise by publishedOn
    // This will show recently updated posts at the top
    const q = query(mentorPostCollectionRef, orderBy('lastUpdated', 'desc'));
    
    return collectionData(q, { idField: 'id' }) as Observable<MentorPost[]>;
  }

  // Return Single Data
  getMentorPostById(id: string): Observable<MentorPost>{
    const mentorPostDocumentRef = doc(this.firestore, 'mentor-post', id);

    return docData(mentorPostDocumentRef, {
      idField: 'id'
    }) as Observable<MentorPost>;
  }

  deleteBlogPostById(id: string): Observable<void>{
    const mentorPostDocumentRef = doc(this.firestore,'mentor-post', id );

    const promise = deleteDoc(mentorPostDocumentRef);

    return from(promise);
  }

  // getAllMentorPosts(): Observable<MentorPost[]> {
  //   const mentorPostCollectionRef = collection(this.firestore, 'mentor-post');
  //   return collectionData(mentorPostCollectionRef, { idField: 'id' }) as Observable<MentorPost[]>;
  // }

    isFollowUpDue(post: MentorPost): boolean {
      if (!post.createdAt || post.followUpInterval == null) return false;
  
      // Convert to number to handle both string and number types
      const followUpInterval = Number(post.followUpInterval);
      
      if (followUpInterval === -1) {
        // Follow-up is stopped
        return false;
      }
  
      const createdDate = new Date(post.createdAt);
      const now = new Date();
  
      // followUpInterval is expected in days
      const diffInMs = now.getTime() - createdDate.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24); // Convert ms to days
  
      return diffInDays >= followUpInterval;
    }

  
  //  isFollowUpDue(post: MentorPost): boolean {
  //   if (!post.createdAt || !post.followUpInterval) return false;

  //   const createdDate = typeof post.createdAt === 'string'
  //     ? new Date(post.createdAt)
  //     : (post.createdAt as any).toDate();

  //   const now = new Date();
  //   const diffInDays = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);

  //   return diffInDays >= post.followUpInterval;
  // }

}
