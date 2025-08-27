import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesService } from '../../core/services/pacientes.service';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  pacientes: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private pacientesService: PacientesService) {}

  ngOnInit(): void {
    this.loadPacientes();
  }

  loadPacientes() {
    this.pacientesService.getAll().subscribe({
      next: (data) => {
        this.pacientes = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar los pacientes';
        this.loading = false;
      }
    });
  }
}
