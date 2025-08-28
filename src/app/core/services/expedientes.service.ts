import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpedientesService {
  private apiUrl = `${environment.apiUrl}/expedientes`;

  constructor(private http: HttpClient) {}

  getMiExpediente(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/mis-expedientes`);
  }

  getExpedientePaciente(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/paciente/${id}`);
  }

  nuevaEntrada(idPaciente: number, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/paciente/${idPaciente}/entrada`, data);
  }

  
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
}
