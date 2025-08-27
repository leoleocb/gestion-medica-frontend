import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../core/services/usuarios.service';

@Component({
  selector: 'app-list-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  usuarios: any[] = [];

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.getAll().subscribe({
      next: (data: any) => { this.usuarios = data; },
      error: (err: any) => { console.error('❌ Error al cargar usuarios', err); }
    });
  }

  editar(id: number): void {
    this.router.navigate([`/admin/usuarios/edit/${id}`]);
  }

  desactivar(id: number): void {
    if (confirm('¿Seguro que deseas desactivar este usuario?')) {
      this.usuariosService.deactivate(id).subscribe({
        next: () => {
          alert('🚫 Usuario desactivado');
          this.cargarUsuarios();
        },
        error: (err: any) => console.error('❌ Error al desactivar usuario', err)
      });
    }
  }
}
