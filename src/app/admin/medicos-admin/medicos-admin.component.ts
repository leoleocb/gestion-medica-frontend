import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicosService } from '../../core/services/medicos.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-medicos-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medicos-admin.component.html',
  styleUrls: ['./medicos-admin.component.css']
})
export class MedicosAdminComponent implements OnInit {
  medicos: any[] = [];
  medico: any = { nombre: '', apellido: '', numeroLicencia: '', telefono: '', email: '', especialidad: '', tarifaConsulta: 0, disponible: true };
  editMode = false;
  selectedId: number | null = null;

  constructor(
    private medicosService: MedicosService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicosService.getAll().subscribe({
      next: (res) => (this.medicos = res),
      error: () => this.notification.show('❌ No se pudieron cargar los médicos', 'danger')
    });
  }

  guardar() {
    if (!this.medico.nombre || !this.medico.numeroLicencia) {
      this.notification.show('❌ Nombre y Licencia son obligatorios', 'danger');
      return;
    }

    if (this.editMode && this.selectedId) {
      this.medicosService.update(this.selectedId, this.medico).subscribe({
        next: () => {
          this.notification.show('✅ Médico actualizado correctamente', 'success');
          this.resetForm();
          this.cargarMedicos();
        },
        error: () => this.notification.show('❌ No se pudo actualizar el médico', 'danger')
      });
    } else {
      this.medicosService.create(this.medico).subscribe({
        next: () => {
          this.notification.show('✅ Médico registrado correctamente', 'success');
          this.resetForm();
          this.cargarMedicos();
        },
        error: () => this.notification.show('❌ No se pudo registrar el médico', 'danger')
      });
    }
  }

  editar(m: any) {
    this.medico = { ...m };
    this.editMode = true;
    this.selectedId = m.id;
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar este médico?')) {
      this.medicosService.delete(id).subscribe({
        next: () => {
          this.notification.show('✅ Médico eliminado', 'success');
          this.cargarMedicos();
        },
        error: () => this.notification.show('❌ No se pudo eliminar el médico', 'danger')
      });
    }
  }

  resetForm() {
    this.medico = { nombre: '', apellido: '', numeroLicencia: '', telefono: '', email: '', especialidad: '', tarifaConsulta: 0, disponible: true };
    this.editMode = false;
    this.selectedId = null;
  }
}
