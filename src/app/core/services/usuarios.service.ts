import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:8080/api/usuarios'; // Ajusta tu backend

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateRole(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/role`, usuario);
  }

  deactivate(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/deactivate`, {});
  }
}
