import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {
  private apiUrl = 'http://localhost:8080/api/medicamentos'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(medicamento: any): Observable<any> {
    return this.http.post(this.apiUrl, medicamento);
  }

  update(id: number, medicamento: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, medicamento);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
