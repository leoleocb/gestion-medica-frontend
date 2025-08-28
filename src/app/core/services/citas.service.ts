import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private apiUrl = `${environment.apiUrl}/citas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMisCitas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mis-citas`);
  }

  getMisCitasMedico(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mis-citas-medico`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getDisponibilidad(medicoId: number, fecha: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/disponibilidad/${medicoId}/${fecha}`);
  }


  create(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  updateEstado(id: number, estado: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/estado?estado=${estado}`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
