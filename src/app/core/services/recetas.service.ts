import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  private apiUrl = `${environment.apiUrl}/recetas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMisRecetas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mis-recetas`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(idPaciente: number, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/paciente/${idPaciente}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  createReceta(pacienteId: number, receta: any) {
  return this.http.post(`${this.apiUrl}/paciente/${pacienteId}`, receta);
}

}
