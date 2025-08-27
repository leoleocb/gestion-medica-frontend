import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  paciente: any;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPerfil();
  }

loadPerfil() {
  const token = localStorage.getItem('token');
  if (!token) {
    this.errorMessage = 'No hay sesión activa';
    return;
  }

  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  this.http.get('http://localhost:8080/api/pacientes/perfil', { headers }).subscribe({
    next: (pac: any) => this.paciente = pac,
    error: (err) => {
      console.error("❌ Error al cargar perfil:", err);
      this.errorMessage = 'No se pudo cargar el perfil';
    }
  });
}
}
