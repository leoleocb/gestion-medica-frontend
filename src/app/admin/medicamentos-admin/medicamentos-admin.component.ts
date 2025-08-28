import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicamentosService } from '../../core/services/medicamentos.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-medicamentos-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medicamentos-admin.component.html',
  styleUrls: ['./medicamentos-admin.component.css']
})
export class MedicamentosAdminComponent implements OnInit {
  medicamentos: any[] = [];
  medicamento: any = { nombre: '', descripcion: '' };
  editMode = false;
  selectedId: number | null = null;

  constructor(
    private medicamentosService: MedicamentosService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.cargarMedicamentos();
  }

  cargarMedicamentos() {
    this.medicamentosService.getAll().subscribe({
      next: (res) => (this.medicamentos = res),
      error: () => this.notification.show('❌ No se pudieron cargar los medicamentos', 'danger')
    });
  }

  guardar() {
    if (!this.medicamento.nombre) {
      this.notification.show('❌ El nombre es obligatorio', 'danger');
      return;
    }

    if (this.editMode && this.selectedId) {
      this.medicamentosService.update(this.selectedId, this.medicamento).subscribe({
        next: () => {
          this.notification.show('✅ Medicamento actualizado correctamente', 'success');
          this.resetForm();
          this.cargarMedicamentos();
        },
        error: () => this.notification.show('❌ No se pudo actualizar el medicamento', 'danger')
      });
    } else {
      this.medicamentosService.create(this.medicamento).subscribe({
        next: () => {
          this.notification.show('✅ Medicamento registrado correctamente', 'success');
          this.resetForm();
          this.cargarMedicamentos();
        },
        error: () => this.notification.show('❌ No se pudo registrar el medicamento', 'danger')
      });
    }
  }

  editar(m: any) {
    this.medicamento = { ...m };
    this.editMode = true;
    this.selectedId = m.id;
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar este medicamento?')) {
      this.medicamentosService.delete(id).subscribe({
        next: () => {
          this.notification.show('✅ Medicamento eliminado', 'success');
          this.cargarMedicamentos();
        },
        error: () => this.notification.show('❌ No se pudo eliminar el medicamento', 'danger')
      });
    }
  }

  resetForm() {
    this.medicamento = { nombre: '', descripcion: '' };
    this.editMode = false;
    this.selectedId = null;
  }
}
