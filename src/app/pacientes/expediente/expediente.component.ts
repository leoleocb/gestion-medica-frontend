import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-expediente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expediente.component.html'
})
export class ExpedienteComponent implements OnInit {
  expediente: any =null;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadExpediente();
  }

  loadExpediente() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get('http://localhost:8080/api/expedientes/mis-expedientes', { headers }).subscribe({
      next: (data: any) => this.expediente = data,
      error: () => this.errorMessage = 'No se pudo cargar el expediente'
    });
  }
}
