import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../core/services/usuarios.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-usuarios-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css']
})
export class UsuariosAdminComponent implements OnInit {
  usuarios: any[] = [];
  usuario: any = { name: '', email: '', roles: [] };
  editMode = false;
  selectedId: number | null = null;

  constructor(
    private usuariosService: UsuariosService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.getAll().subscribe({
      next: (res) => (this.usuarios = res),
      error: () => this.notification.show('❌ No se pudieron cargar los usuarios', 'danger')
    });
  }

  guardar() {
    if (!this.usuario.name || !this.usuario.email) {
      this.notification.show('❌ Nombre y email son obligatorios', 'danger');
      return;
    }

    if (this.editMode && this.selectedId) {
      this.usuariosService.update(this.selectedId, this.usuario).subscribe({
        next: () => {
          this.notification.show('✅ Usuario actualizado correctamente', 'success');
          this.resetForm();
          this.cargarUsuarios();
        },
        error: () => this.notification.show('❌ No se pudo actualizar el usuario', 'danger')
      });
    } else {
      this.usuariosService.create(this.usuario).subscribe({
        next: () => {
          this.notification.show('✅ Usuario registrado correctamente', 'success');
          this.resetForm();
          this.cargarUsuarios();
        },
        error: () => this.notification.show('❌ No se pudo registrar el usuario', 'danger')
      });
    }
  }

  editar(u: any) {
    this.usuario = { ...u, roles: u.roles.map((r: any) => r.name) };
    this.editMode = true;
    this.selectedId = u.id;
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.usuariosService.delete(id).subscribe({
        next: () => {
          this.notification.show('✅ Usuario eliminado', 'success');
          this.cargarUsuarios();
        },
        error: () => this.notification.show('❌ No se pudo eliminar el usuario', 'danger')
      });
    }
  }

  resetForm() {
    this.usuario = { name: '', email: '', roles: [] };
    this.editMode = false;
    this.selectedId = null;
  }
}
