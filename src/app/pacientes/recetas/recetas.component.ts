import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recetas.component.html'
})
export class RecetasComponent implements OnInit {
  recetas: any[] = [];
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRecetas();
  }

  loadRecetas() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get('http://localhost:8080/api/recetas/mis-recetas', { headers }).subscribe({
      next: (data: any) => this.recetas = data,
      error: () => this.errorMessage = 'No se pudieron cargar las recetas'
    });
  }
}
