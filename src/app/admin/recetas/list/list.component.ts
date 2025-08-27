import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RecetasService } from '../../../core/services/recetas.service';

@Component({
  selector: 'app-list-recetas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  recetas: any[] = [];

  constructor(
    private recetasService: RecetasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarRecetas();
  }

  cargarRecetas(): void {
    this.recetasService.getAll().subscribe({
      next: (data: any) => { this.recetas = data; },
      error: (err: any) => { console.error('❌ Error al cargar recetas', err); }
    });
  }

  verDetalle(id: number): void {
    this.router.navigate([`/admin/recetas/detalle/${id}`]);
  }
}
