import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadesService {
  private apiUrl = 'http://localhost:8080/api/enfermedades'; 
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(enfermedad: any): Observable<any> {
    return this.http.post(this.apiUrl, enfermedad);
  }

  update(id: number, enfermedad: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, enfermedad);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
