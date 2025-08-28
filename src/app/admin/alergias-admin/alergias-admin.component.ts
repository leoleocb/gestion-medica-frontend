import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlergiasService } from '../../core/services/alergias.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-alergias-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alergias-admin.component.html',
  styleUrls: ['./alergias-admin.component.css']
})
export class AlergiasAdminComponent implements OnInit {
  alergias: any[] = [];
  alergia: any = { nombre: '', descripcion: '' };
  editMode = false;
  selectedId: number | null = null;

  constructor(
    private alergiasService: AlergiasService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.cargarAlergias();
  }

  cargarAlergias() {
    this.alergiasService.getAll().subscribe({
      next: (res) => (this.alergias = res),
      error: () => this.notification.show('❌ No se pudieron cargar las alergias', 'danger')
    });
  }

  guardar() {
    if (!this.alergia.nombre) {
      this.notification.show('❌ El nombre es obligatorio', 'danger');
      return;
    }

    if (this.editMode && this.selectedId) {
      this.alergiasService.update(this.selectedId, this.alergia).subscribe({
        next: () => {
          this.notification.show('✅ Alergia actualizada correctamente', 'success');
          this.resetForm();
          this.cargarAlergias();
        },
        error: () => this.notification.show('❌ No se pudo actualizar la alergia', 'danger')
      });
    } else {
      this.alergiasService.create(this.alergia).subscribe({
        next: () => {
          this.notification.show('✅ Alergia registrada correctamente', 'success');
          this.resetForm();
          this.cargarAlergias();
        },
        error: () => this.notification.show('❌ No se pudo registrar la alergia', 'danger')
      });
    }
  }

  editar(a: any) {
    this.alergia = { ...a };
    this.editMode = true;
    this.selectedId = a.id;
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar esta alergia?')) {
      this.alergiasService.delete(id).subscribe({
        next: () => {
          this.notification.show('✅ Alergia eliminada', 'success');
          this.cargarAlergias();
        },
        error: () => this.notification.show('❌ No se pudo eliminar la alergia', 'danger')
      });
    }
  }

  resetForm() {
    this.alergia = { nombre: '', descripcion: '' };
    this.editMode = false;
    this.selectedId = null;
  }
}
