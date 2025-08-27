import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalPacientes: number = 0;
  totalMedicos: number = 0;
  totalCitas: number = 0;
  totalRecetas: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.http.get<any[]>('http://localhost:8080/api/pacientes').subscribe(p => this.totalPacientes = p.length);
    this.http.get<any[]>('http://localhost:8080/api/medicos').subscribe(m => this.totalMedicos = m.length);
    this.http.get<any[]>('http://localhost:8080/api/citas').subscribe(c => this.totalCitas = c.length);
    this.http.get<any[]>('http://localhost:8080/api/recetas').subscribe(r => this.totalRecetas = r.length);
  }
}
