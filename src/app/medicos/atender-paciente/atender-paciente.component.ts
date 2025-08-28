import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpedientesService } from '../../core/services/expedientes.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-atender-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './atender-paciente.component.html',
  styleUrls: ['./atender-paciente.component.css']
})
export class AtenderPacienteComponent {
  diagnostico: string = '';
  tratamiento: string = '';
  pacienteId: number;

  constructor(
    private expedienteService: ExpedientesService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService
  ) {
    this.pacienteId = Number(this.route.snapshot.paramMap.get('id'));
  }

  guardar() {
    if (!this.diagnostico || !this.tratamiento) {
      this.notification.show('❌ Todos los campos son obligatorios', 'danger');
      return;
    }

    const entrada = {
      diagnostico: this.diagnostico,
      tratamiento: this.tratamiento
    };

    this.expedienteService.nuevaEntrada(this.pacienteId, entrada).subscribe({
      next: () => {
        this.notification.show('✅ Entrada clínica añadida al expediente', 'success');
        setTimeout(() => this.router.navigate(['/medicos/citas']), 1500);
      },
      error: (err) => {
        this.notification.show(err.error?.error || '❌ No se pudo registrar la atención', 'danger');
      }
    });
  }
}
