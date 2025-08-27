import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PacientesService } from '../../../core/services/pacientes.service';

@Component({
  selector: 'app-list-pacientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  pacientes: any[] = [];

  constructor(
    private pacientesService: PacientesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.pacientesService.getAll().subscribe({
      next: (data: any) => { this.pacientes = data; },
      error: (err: any) => { console.error('❌ Error al cargar pacientes', err); }
    });
  }

  crear(): void {
    this.router.navigate(['/admin/pacientes/create']);
  }

  editar(id: number): void {
    this.router.navigate([`/admin/pacientes/edit/${id}`]);
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este paciente?')) {
      this.pacientesService.delete(id).subscribe({
        next: () => {
          alert('🗑️ Paciente eliminado');
          this.cargarPacientes();
        },
        error: (err: any) => console.error('❌ Error al eliminar paciente', err)
      });
    }
  }
}
