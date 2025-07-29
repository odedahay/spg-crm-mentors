import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { UserService } from '../core/services/user.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanMatchFn = () => {
  const auth = inject(Auth);
  const authService = inject(UserService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return new Promise<boolean>((resolve) => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        authService.currentUser.set({
          id: firebaseUser.uid,
          email: firebaseUser.email ?? ''
        });
        resolve(true);
      } else {
        router.navigate(['/login']);
        resolve(false);
        toastr.error('Authorised access only', 'Error');
      }
    });
  });
};
