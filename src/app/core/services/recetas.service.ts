import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  private apiUrl = 'http://localhost:8080/api/recetas';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  create(idPaciente: number, receta: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/nueva/${idPaciente}`, receta, { headers: this.getAuthHeaders() });
  }

  update(id: number, receta: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, receta, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  getByPaciente(idPaciente: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/paciente/${idPaciente}`, { headers: this.getAuthHeaders() });
  }

  getByMedico(idMedico: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/medico/${idMedico}`, { headers: this.getAuthHeaders() });
  }
}
