import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-citas-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  citas: any[] = [];
  nuevaCita: any = { fecha: '', hora: '', motivo: '' };
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCitas();
  }

  loadCitas() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get('http://localhost:8080/api/citas/mis-citas', { headers }).subscribe({
      next: (data: any) => this.citas = data,
      error: () => this.errorMessage = 'No se pudieron cargar las citas'
    });
  }

  crearCita() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.post('http://localhost:8080/api/citas', this.nuevaCita, { headers }).subscribe({
      next: () => {
        this.nuevaCita = { fecha: '', hora: '', motivo: '' };
        this.loadCitas();
      },
      error: () => this.errorMessage = 'No se pudo crear la cita'
    });
  }
}
