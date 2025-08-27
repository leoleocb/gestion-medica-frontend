import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlergiasService {
  private apiUrl = 'http://localhost:8080/api/alergias'; 
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(alergia: any): Observable<any> {
    return this.http.post(this.apiUrl, alergia);
  }

  update(id: number, alergia: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, alergia);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
