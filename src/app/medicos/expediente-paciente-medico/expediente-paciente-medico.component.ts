import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ExpedientesService } from '../../core/services/expedientes.service';

@Component({
  selector: 'app-expediente-paciente-medico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expediente-paciente-medico.component.html',
  styleUrls: ['./expediente-paciente-medico.component.css']
})
export class ExpedientePacienteMedicoComponent implements OnInit {
  expediente: any;
  loading = true;
  error = '';
  pacienteId: number;

  constructor(
    private expedienteService: ExpedientesService,
    private route: ActivatedRoute
  ) {
    this.pacienteId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.expedienteService.getExpedientePaciente(this.pacienteId).subscribe({
      next: (res) => {
        this.expediente = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el expediente del paciente';
        this.loading = false;
      }
    });
  }
}
