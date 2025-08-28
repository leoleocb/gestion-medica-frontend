import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  authStatus$ = this.loggedIn.asObservable();

  login(token: string, roles: string[]) {
    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));
    this.loggedIn.next(true); 
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.loggedIn.next(false); 
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRoles(): string[] {
    return JSON.parse(localStorage.getItem('roles') || '[]');
  }
}
