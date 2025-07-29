import { Injectable, computed, signal } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private userSignal = signal<User | null>(null);
  authResolved = signal(false);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.userSignal.set(user);
      this.authResolved.set(true);
    });
  }

  currentUser = computed(() => this.userSignal());

  isAuthenticated(): boolean {
    return this.userSignal() !== null;
  }
}