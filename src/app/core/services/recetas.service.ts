import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  private apiUrl = 'http://localhost:8080/api/recetas'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(receta: any): Observable<any> {
    return this.http.post(this.apiUrl, receta);
  }

  update(id: number, receta: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, receta);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
