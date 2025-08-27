import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlergiasService } from '../../../core/services/alergias.service';

@Component({
  selector: 'app-list-alergias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  alergias: any[] = [];

  constructor(
    private alergiasService: AlergiasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarAlergias();
  }

  cargarAlergias(): void {
    this.alergiasService.getAll().subscribe({
      next: (data: any) => { this.alergias = data; },
      error: (err: any) => { console.error('❌ Error al cargar alergias', err); }
    });
  }

  crear(): void {
    this.router.navigate(['/admin/alergias/create']);
  }

  editar(id: number): void {
    this.router.navigate([`/admin/alergias/edit/${id}`]);
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta alergia?')) {
      this.alergiasService.delete(id).subscribe({
        next: () => {
          alert('🗑️ Alergia eliminada');
          this.cargarAlergias();
        },
        error: (err: any) => console.error('❌ Error al eliminar alergia', err)
      });
    }
  }
}
