import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EnfermedadesService } from '../../../core/services/enfermedades.service';

@Component({
  selector: 'app-list-enfermedades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  enfermedades: any[] = [];

  constructor(
    private enfermedadesService: EnfermedadesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEnfermedades();
  }

  cargarEnfermedades(): void {
    this.enfermedadesService.getAll().subscribe({
      next: (data: any) => { this.enfermedades = data; },
      error: (err: any) => { console.error('❌ Error al cargar enfermedades', err); }
    });
  }

  crear(): void {
    this.router.navigate(['/admin/enfermedades/create']);
  }

  editar(id: number): void {
    this.router.navigate([`/admin/enfermedades/edit/${id}`]);
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta enfermedad?')) {
      this.enfermedadesService.delete(id).subscribe({
        next: () => {
          alert('🗑️ Enfermedad eliminada');
          this.cargarEnfermedades();
        },
        error: (err: any) => console.error('❌ Error al eliminar enfermedad', err)
      });
    }
  }
}
