import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpedientesService {
  private apiUrl = 'http://localhost:8080/api/expedientes';

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

  create(expediente: any): Observable<any> {
    return this.http.post(this.apiUrl, expediente, { headers: this.getAuthHeaders() });
  }

  update(id: number, expediente: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, expediente, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  getByPaciente(idPaciente: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/paciente/${idPaciente}`, { headers: this.getAuthHeaders() });
  }

  addEntrada(idPaciente: number, entrada: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/entrada/nueva/${idPaciente}`, entrada, { headers: this.getAuthHeaders() });
  }
}
