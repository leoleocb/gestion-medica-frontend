import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacientesService } from '../../core/services/pacientes.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-pacientes-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pacientes-admin.component.html',
  styleUrls: ['./pacientes-admin.component.css']
})
export class PacientesAdminComponent implements OnInit {
  pacientes: any[] = [];
  paciente: any = { nombre: '', numeroIdentificacion: '', fechaNacimiento: '' };
  editMode = false;
  selectedId: number | null = null;

  constructor(
    private pacientesService: PacientesService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.pacientesService.getAll().subscribe({
      next: (res) => (this.pacientes = res),
      error: () => this.notification.show('❌ No se pudieron cargar los pacientes', 'danger')
    });
  }

  guardar() {
    if (!this.paciente.nombre || !this.paciente.numeroIdentificacion) {
      this.notification.show('❌ Todos los campos son obligatorios', 'danger');
      return;
    }

    if (this.editMode && this.selectedId) {
      this.pacientesService.update(this.selectedId, this.paciente).subscribe({
        next: () => {
          this.notification.show('✅ Paciente actualizado correctamente', 'success');
          this.resetForm();
          this.cargarPacientes();
        },
        error: () => this.notification.show('❌ No se pudo actualizar el paciente', 'danger')
      });
    } else {
      this.pacientesService.create(this.paciente).subscribe({
        next: () => {
          this.notification.show('✅ Paciente registrado correctamente', 'success');
          this.resetForm();
          this.cargarPacientes();
        },
        error: () => this.notification.show('❌ No se pudo registrar el paciente', 'danger')
      });
    }
  }

  editar(p: any) {
    this.paciente = { ...p };
    this.editMode = true;
    this.selectedId = p.id;
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar este paciente?')) {
      this.pacientesService.delete(id).subscribe({
        next: () => {
          this.notification.show('✅ Paciente eliminado', 'success');
          this.cargarPacientes();
        },
        error: () => this.notification.show('❌ No se pudo eliminar el paciente', 'danger')
      });
    }
  }

  resetForm() {
    this.paciente = { nombre: '', numeroIdentificacion: '', fechaNacimiento: '' };
    this.editMode = false;
    this.selectedId = null;
  }
}
