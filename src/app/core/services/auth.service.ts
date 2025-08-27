import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  // Login recibe email y password, retorna el token
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      email: email,
      password: password
    });
  }

  // Obtiene el token actual
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Verifica si hay sesión activa
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Cierra sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
  }
}
