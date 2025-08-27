import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MedicamentosService } from '../../../core/services/medicamentos.service';

@Component({
  selector: 'app-list-medicamentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  medicamentos: any[] = [];

  constructor(
    private medicamentosService: MedicamentosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarMedicamentos();
  }

  cargarMedicamentos(): void {
    this.medicamentosService.getAll().subscribe({
      next: (data: any) => { this.medicamentos = data; },
      error: (err: any) => { console.error('❌ Error al cargar medicamentos', err); }
    });
  }

  crear(): void {
    this.router.navigate(['/admin/medicamentos/create']);
  }

  editar(id: number): void {
    this.router.navigate([`/admin/medicamentos/edit/${id}`]);
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este medicamento?')) {
      this.medicamentosService.delete(id).subscribe({
        next: () => {
          alert('🗑️ Medicamento eliminado');
          this.cargarMedicamentos();
        },
        error: (err: any) => console.error('❌ Error al eliminar medicamento', err)
      });
    }
  }
}
