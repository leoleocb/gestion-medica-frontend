import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MedicosService } from '../../../core/services/medicos.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list-medicos',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  medicos: any[] = [];

  constructor(private medicosService: MedicosService) {}

  ngOnInit(): void {
    this.loadMedicos();
  }

  loadMedicos() {
    this.medicosService.getAll().subscribe({
      next: (data) => this.medicos = data,
      error: (err) => console.error(err)
    });
  }

  eliminarMedico(id: number) {
    if (confirm('¿Seguro que deseas eliminar este médico?')) {
      this.medicosService.delete(id).subscribe({
        next: () => {
          alert('✅ Médico eliminado');
          this.loadMedicos();
        },
        error: (err) => {
          console.error(err);
          alert('❌ Error al eliminar médico');
        }
      });
    }
  }
}
