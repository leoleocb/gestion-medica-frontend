import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { MedicosService } from '../../core/services/medicos.service';
import { CitasService } from '../../core/services/citas.service';

@Component({
  selector: 'app-nueva-cita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nueva-cita.component.html',
  styleUrls: ['./nueva-cita.component.css']
})
export class NuevaCitaComponent implements OnInit {
  especialidades: string[] = [];
  medicos: any[] = [];
  horarios: string[] = [];
  especialidadSeleccionada = '';
  cita: any = { medicoId: null, fecha: '', hora: '', motivo: '' };

  constructor(
    private medicosService: MedicosService,
    private citasService: CitasService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  cargarEspecialidades() {
    this.medicosService.getEspecialidades().subscribe({
      next: (res) => (this.especialidades = res),
      error: () => this.notification.show('❌ No se pudieron cargar las especialidades', 'danger')
    });
  }

  onEspecialidadChange() {
    if (!this.especialidadSeleccionada) return;
    this.medicosService.getByEspecialidad(this.especialidadSeleccionada).subscribe({
      next: (res) => (this.medicos = res),
      error: () => this.notification.show('❌ No se pudieron cargar los médicos', 'danger')
    });
  }

  onFechaChange() {
    if (!this.cita.medicoId || !this.cita.fecha) return;
    this.citasService.getDisponibilidad(this.cita.medicoId, this.cita.fecha).subscribe({
      next: (res) => (this.horarios = res),
      error: () => this.notification.show('❌ No se pudieron cargar los horarios', 'danger')
    });
  }

  guardarCita() {
    if (!this.cita.medicoId || !this.cita.fecha || !this.cita.hora || !this.cita.motivo) {
      this.notification.show('❌ Complete todos los campos', 'danger');
      return;
    }

    const payload = {
      medico: { id: this.cita.medicoId },
      fecha: this.cita.fecha,  // YYYY-MM-DD
      hora: this.cita.hora,    // HH:mm
      motivo: this.cita.motivo
    };

    this.citasService.create(payload).subscribe({
      next: () => {
        this.notification.show('✅ Cita registrada correctamente', 'success');
        setTimeout(() => this.router.navigate(['/pacientes/citas']), 1200);
      },
      error: () => this.notification.show('❌ No se pudo registrar la cita', 'danger')
    });
  }
}
