import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  firebaseAuth = inject(Auth);

  currentUser = signal<User | undefined>(undefined);

  user$ = user(this.firebaseAuth);


  register(email: string, password: string): Observable<void>{
    const authPromise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
    .then(()=>{})

    return from(authPromise);
  }

  login(email: string, password:string):Observable<User>{
    const authPromise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
    .then((userCredentials) => {
      return{
        email:userCredentials.user.email,
        id: userCredentials.user.uid
      } as User;
    });

    return from(authPromise);
  }

}
