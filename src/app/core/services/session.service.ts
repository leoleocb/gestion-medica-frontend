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
}
