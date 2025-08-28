import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PacientesService } from '../../core/services/pacientes.service';

@Component({
  selector: 'app-pacientes-medico',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pacientes-medico.component.html',
  styleUrls: ['./pacientes-medico.component.css']
})
export class PacientesMedicoComponent implements OnInit {
  pacientes: any[] = [];
  loading = true;
  error = '';

  constructor(private pacientesService: PacientesService) {}

  ngOnInit(): void {
    this.pacientesService.getAll().subscribe({
      next: (res) => {
        this.pacientes = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la lista de pacientes';
        this.loading = false;
      }
    });
  }
}
