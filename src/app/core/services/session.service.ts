import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];
    try {
      const payload = jwtDecode<CustomJwtPayload>(token);
      return payload.roles || [];
    } catch {
      return [];
    }
  }

  clear(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
