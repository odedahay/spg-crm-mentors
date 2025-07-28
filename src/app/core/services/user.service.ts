import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn = false;
  
  firebaseAuth = inject(Auth);

  register(email: string, password: string): Observable<void>{
    const authPromise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
    .then(()=>{})

    return from(authPromise);
  }

}
