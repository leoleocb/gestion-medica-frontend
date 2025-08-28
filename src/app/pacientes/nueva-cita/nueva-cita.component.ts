import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CitasService } from '../../core/services/citas.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-nueva-cita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nueva-cita.component.html',
  styleUrls: ['./nueva-cita.component.css']
})
export class NuevaCitaComponent {
  fecha: string = '';
  hora: string = '';
  motivo: string = '';
  medicoId: number | null = null;

  constructor(
    private citasService: CitasService,
    private router: Router,
    private notification: NotificationService
  ) {}

  crearCita() {
    if (!this.fecha || !this.hora || !this.motivo || !this.medicoId) {
      this.notification.show('❌ Todos los campos son obligatorios', 'danger');
      return;
    }

    const cita = {
      fecha: this.fecha,
      hora: this.hora,
      motivo: this.motivo,
      medico: { id: this.medicoId }
    };

    this.citasService.create(cita).subscribe({
      next: () => {
        this.notification.show('✅ Cita creada correctamente', 'success');
        setTimeout(() => this.router.navigate(['/pacientes/citas']), 1500);
      },
      error: (err) => {
        this.notification.show(err.error?.error || '❌ Error al crear la cita', 'danger');
      }
    });
  }
}
