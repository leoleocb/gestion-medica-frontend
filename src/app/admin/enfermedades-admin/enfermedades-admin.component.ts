import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnfermedadesService } from '../../core/services/enfermedades.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-enfermedades-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enfermedades-admin.component.html',
  styleUrls: ['./enfermedades-admin.component.css']
})
export class EnfermedadesAdminComponent implements OnInit {
  enfermedades: any[] = [];
  enfermedad: any = { nombre: '', descripcion: '' };
  editMode = false;
  selectedId: number | null = null;

  constructor(
    private enfermedadesService: EnfermedadesService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.cargarEnfermedades();
  }

  cargarEnfermedades() {
    this.enfermedadesService.getAll().subscribe({
      next: (res) => (this.enfermedades = res),
      error: () => this.notification.show('❌ No se pudieron cargar las enfermedades', 'danger')
    });
  }

  guardar() {
    if (!this.enfermedad.nombre) {
      this.notification.show('❌ El nombre es obligatorio', 'danger');
      return;
    }

    if (this.editMode && this.selectedId) {
      this.enfermedadesService.update(this.selectedId, this.enfermedad).subscribe({
        next: () => {
          this.notification.show('✅ Enfermedad actualizada correctamente', 'success');
          this.resetForm();
          this.cargarEnfermedades();
        },
        error: () => this.notification.show('❌ No se pudo actualizar la enfermedad', 'danger')
      });
    } else {
      this.enfermedadesService.create(this.enfermedad).subscribe({
        next: () => {
          this.notification.show('✅ Enfermedad registrada correctamente', 'success');
          this.resetForm();
          this.cargarEnfermedades();
        },
        error: () => this.notification.show('❌ No se pudo registrar la enfermedad', 'danger')
      });
    }
  }

  editar(e: any) {
    this.enfermedad = { ...e };
    this.editMode = true;
    this.selectedId = e.id;
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar esta enfermedad?')) {
      this.enfermedadesService.delete(id).subscribe({
        next: () => {
          this.notification.show('✅ Enfermedad eliminada', 'success');
          this.cargarEnfermedades();
        },
        error: () => this.notification.show('❌ No se pudo eliminar la enfermedad', 'danger')
      });
    }
  }

  resetForm() {
    this.enfermedad = { nombre: '', descripcion: '' };
    this.editMode = false;
    this.selectedId = null;
  }
}
