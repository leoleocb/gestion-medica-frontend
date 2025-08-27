import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private apiUrl = 'http://localhost:8080/api/citas';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // CRUD general (Admin)
  getAll(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  create(cita: any): Observable<any> {
    return this.http.post(this.apiUrl, cita, { headers: this.getAuthHeaders() });
  }

  update(id: number, cita: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cita, { headers: this.getAuthHeaders() });
  }

  cancelar(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/cancelar`, {}, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Consultas específicas
  getByPaciente(idPaciente: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/paciente/${idPaciente}`, { headers: this.getAuthHeaders() });
  }

  getByMedico(idMedico: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/medico/${idMedico}`, { headers: this.getAuthHeaders() });
  }

  getMisCitas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/medico/mis-citas`, { headers: this.getAuthHeaders() });
  }

  completarCita(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/completar`, {}, { headers: this.getAuthHeaders() });
  }
}
