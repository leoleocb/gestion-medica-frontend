import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  private apiUrl = 'http://localhost:8080/api/medicos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(medico: any): Observable<any> {
    return this.http.post(this.apiUrl, medico);
  }

  update(id: number, medico: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, medico);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
