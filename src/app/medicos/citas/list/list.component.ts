import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasService } from '../../../core/services/citas.service';

@Component({
  selector: 'app-citas-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  citas: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private citasService: CitasService) {}

  ngOnInit(): void {
    this.loadCitas();
  }

  loadCitas() {
    this.loading = true;
    this.citasService.getMisCitas().subscribe({
      next: (data) => {
        this.citas = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las citas';
        this.loading = false;
      }
    });
  }

  onCompletar(id: number) {
    this.citasService.completarCita(id).subscribe(() => this.loadCitas());
  }

  onCancelar(id: number) {
    this.citasService.cancelar(id).subscribe(() => this.loadCitas());
  }
}
