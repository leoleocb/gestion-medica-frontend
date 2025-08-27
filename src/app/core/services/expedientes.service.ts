import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpedientesService {
  private apiUrl = 'http://localhost:8080/api/expediente';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(expediente: any): Observable<any> {
    return this.http.post(this.apiUrl, expediente);
  }

  update(id: number, expediente: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, expediente);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
