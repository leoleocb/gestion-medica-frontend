import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CitasService } from '../../../core/services/citas.service';

@Component({
  selector: 'app-list-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  citas: any[] = [];

  constructor(
    private citasService: CitasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citasService.getAll().subscribe({
      next: (data: any) => { this.citas = data; },
      error: (err: any) => { console.error('❌ Error al cargar citas', err); }
    });
  }

  editar(id: number): void {
    this.router.navigate([`/admin/citas/edit/${id}`]);
  }

  cancelar(id: number): void {
    if (confirm('¿Seguro que deseas cancelar esta cita?')) {
      this.citasService.cancelar(id).subscribe({
        next: () => {
          alert('🚫 Cita cancelada');
          this.cargarCitas();
        },
        error: (err: any) => console.error('❌ Error al cancelar cita', err)
      });
    }
  }
}
