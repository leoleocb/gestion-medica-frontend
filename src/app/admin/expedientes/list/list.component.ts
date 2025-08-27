import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ExpedientesService } from '../../../core/services/expedientes.service';

@Component({
  selector: 'app-list-expedientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  expedientes: any[] = [];

  constructor(
    private expedientesService: ExpedientesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarExpedientes();
  }

  cargarExpedientes(): void {
    this.expedientesService.getAll().subscribe({
      next: (data: any) => { this.expedientes = data; },
      error: (err: any) => { console.error('❌ Error al cargar expedientes', err); }
    });
  }

  verDetalle(id: number): void {
    this.router.navigate([`/admin/expedientes/detalle/${id}`]);
  }
}
