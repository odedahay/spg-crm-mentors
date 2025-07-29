import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const authResolved = authService.authResolved;
  const currentUser = authService.currentUser;

  if (!authResolved()) {
    // Block route matching until auth is resolved
    return false;
  }

  if (!currentUser()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};