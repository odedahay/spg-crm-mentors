import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user, onAuthStateChanged } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  firebaseAuth = inject(Auth);

  currentUser = signal<User | undefined>(undefined);

  user$ = user(this.firebaseAuth);

  constructor() {
    // Listen to Firebase auth state changes to maintain currentUser signal
    onAuthStateChanged(this.firebaseAuth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, update the signal
        this.currentUser.set({
          email: firebaseUser.email,
          id: firebaseUser.uid
        } as User);
      } else {
        // User is signed out, clear the signal
        this.currentUser.set(undefined);
      }
    });
  }

  register(email: string, password: string): Observable<void>{
    const authPromise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
    .then(()=>{})

    return from(authPromise);
  }

  login(email: string, password:string):Observable<User>{
    const authPromise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
    .then((userCredentials) => {
      const user = {
        email:userCredentials.user.email,
        id: userCredentials.user.uid
      } as User;
      
      // Update the currentUser signal immediately after login
      this.currentUser.set(user);
      
      return user;
    });

    return from(authPromise);
  }

  logout():Observable<void>{
    const authPromise = signOut(this.firebaseAuth)
    .then(() => {
      // Clear the currentUser signal immediately after logout
      this.currentUser.set(undefined);
    });

    return from(authPromise);
  }

}
