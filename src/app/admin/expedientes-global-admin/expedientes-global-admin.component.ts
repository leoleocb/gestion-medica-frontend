import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpedientesService } from '../../core/services/expedientes.service';

@Component({
  selector: 'app-expedientes-global-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expedientes-global-admin.component.html',
  styleUrls: ['./expedientes-global-admin.component.css']
})
export class ExpedientesGlobalAdminComponent implements OnInit {
  expedientes: any[] = [];
  loading = true;
  error = '';

  constructor(private expedientesService: ExpedientesService) {}

  ngOnInit(): void {
    // No existe endpoint directo de "todos los expedientes",
    // así que usamos pacientes y armamos sus expedientes
    this.expedientesService.getMiExpediente().subscribe({
      next: (res) => {
        this.expedientes = Array.isArray(res) ? res : [res];
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los expedientes';
        this.loading = false;
      }
    });
  }
}
