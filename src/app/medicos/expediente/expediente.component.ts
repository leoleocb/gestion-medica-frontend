import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpedientesService } from '../../core/services/expedientes.service';

@Component({
  selector: 'app-expediente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedienteComponent implements OnInit {
  expedientes: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private expedientesService: ExpedientesService) {}

  ngOnInit(): void {
    this.loadExpedientes();
  }

  loadExpedientes() {
    this.expedientesService.getAll().subscribe({
      next: (data) => {
        this.expedientes = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar los expedientes';
        this.loading = false;
      }
    });
  }
}
