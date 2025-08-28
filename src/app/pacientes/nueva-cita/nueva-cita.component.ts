import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CitasService } from '../../core/services/citas.service';
import { MedicosService } from '../../core/services/medicos.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-nueva-cita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nueva-cita.component.html',
  styleUrls: ['./nueva-cita.component.css']
})
export class NuevaCitaComponent {
  especialidades: string[] = ['Cardiología'];
  especialidad: string = '';
  medicos: any[] = [];
  medicoId: number | null = null;
  tarifa: number | null = null;

  fecha: string = '';
  horarios: string[] = [];
  hora: string = '';
  motivo: string = '';

  constructor(
    private citasService: CitasService,
    private medicosService: MedicosService,
    private router: Router,
    private notification: NotificationService
  ) {}

  cargarMedicos() {
    if (this.especialidad) {
      this.medicosService.getByEspecialidad(this.especialidad).subscribe({
        next: (res: any[]) => this.medicos = res,
        error: () => this.notification.show('❌ No se pudieron cargar los médicos', 'danger')
      });
    }
  }


  esFechaValida(fechaStr: string): boolean {
    const fecha = new Date(fechaStr);
    const dia = fecha.getUTCDay(); 
    return dia >= 1 && dia <= 5;
  }

  cargarHorarios() {
    if (this.medicoId && this.fecha) {
      if (!this.esFechaValida(this.fecha)) {
        this.notification.show('❌ Solo puedes seleccionar días de lunes a viernes', 'danger');
        this.horarios = [];
        return;
      }

      const medico = this.medicos.find(m => m.id == this.medicoId);
      this.tarifa = medico?.tarifaConsulta;

      this.citasService.getDisponibilidad(this.medicoId, this.fecha).subscribe({
        next: (res: any[]) => {
          // ✅ Filtrar horarios solo entre 08:00 y 16:00
          this.horarios = res.filter(h => {
            const hora = parseInt(h.split(':')[0], 10);
            return hora >= 8 && hora <= 16;
          });
        },
        error: () => this.notification.show('❌ No se pudieron cargar los horarios', 'danger')
      });
    }
  }

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
