import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private apiUrl = 'http://localhost:8080/api/pacientes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(paciente: any): Observable<any> {
    return this.http.post(this.apiUrl, paciente);
  }

  update(id: number, paciente: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, paciente);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
