import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = `${environment.apiUrl}/perfil`;

  constructor(private http: HttpClient) {}

  getPerfil(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  cambiarPassword(actual: string, nueva: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/password`, { actual, nueva });
  }
}
