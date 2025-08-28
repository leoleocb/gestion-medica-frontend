import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpedientesService } from '../../core/services/expedientes.service';

@Component({
  selector: 'app-expediente-paciente',
  standalone: true,
    imports: [CommonModule],
  templateUrl: './expediente-paciente.component.html',
  styleUrls: ['./expediente-paciente.component.css']
})
export class ExpedientePacienteComponent implements OnInit {
  expediente: any;
  loading = true;
  error = '';

  constructor(private expedienteService: ExpedientesService) {}

  ngOnInit(): void {
    this.expedienteService.getMiExpediente().subscribe({
      next: (res) => {
        this.expediente = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el expediente.';
        this.loading = false;
      }
    });
  }
}
