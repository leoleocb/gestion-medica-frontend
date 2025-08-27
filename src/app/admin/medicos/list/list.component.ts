import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MedicosService } from '../../../core/services/medicos.service';

@Component({
  selector: 'app-list-medicos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  medicos: any[] = [];

  constructor(
    private medicosService: MedicosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(): void {
    this.medicosService.getAll().subscribe({
      next: (data: any) => { this.medicos = data; },
      error: (err: any) => { console.error('❌ Error al cargar médicos', err); }
    });
  }

  crear(): void {
    this.router.navigate(['/admin/medicos/create']);
  }

  editar(id: number): void {
    this.router.navigate([`/admin/medicos/edit/${id}`]);
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este médico?')) {
      this.medicosService.delete(id).subscribe({
        next: () => {
          alert('🗑️ Médico eliminado');
          this.cargarMedicos();
        },
        error: (err: any) => console.error('❌ Error al eliminar médico', err)
      });
    }
  }
}
