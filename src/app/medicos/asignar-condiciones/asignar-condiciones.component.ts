import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlergiasService } from '../../core/services/alergias.service';
import { EnfermedadesService } from '../../core/services/enfermedades.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-asignar-condiciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asignar-condiciones.component.html',
  styleUrls: ['./asignar-condiciones.component.css']
})
export class AsignarCondicionesComponent {
  pacienteId: number;
  alergia = { nombre: '', descripcion: '' };
  enfermedad = { nombre: '', descripcion: '' };

  constructor(
    private route: ActivatedRoute,
    private alergiasService: AlergiasService,
    private enfermedadesService: EnfermedadesService,
    private notification: NotificationService
  ) {
    this.pacienteId = Number(this.route.snapshot.paramMap.get('id'));
  }

asignarAlergia() {
  if (!this.alergia.nombre) {
    this.notification.show('❌ El nombre de la alergia es obligatorio', 'danger');
    return;
  }
  this.alergiasService.asignarAPaciente(this.pacienteId, this.alergia).subscribe({
    next: () => {
      this.notification.show('✅ Alergia asignada correctamente', 'success');
      this.alergia = { nombre: '', descripcion: '' };
    },
    error: () => this.notification.show('❌ No se pudo asignar la alergia', 'danger')
  });
}

asignarEnfermedad() {
  if (!this.enfermedad.nombre) {
    this.notification.show('❌ El nombre de la enfermedad es obligatorio', 'danger');
    return;
  }
  this.enfermedadesService.asignarAPaciente(this.pacienteId, this.enfermedad).subscribe({
    next: () => {
      this.notification.show('✅ Enfermedad asignada correctamente', 'success');
      this.enfermedad = { nombre: '', descripcion: '' };
    },
    error: () => this.notification.show('❌ No se pudo asignar la enfermedad', 'danger')
  });
}
}
