import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicamentosService } from '../../../core/services/medicamentos.service';

@Component({
  selector: 'app-create-medicamento',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html'
})
export class CreateComponent {
  medicamento = { nombre: '', descripcion: '' };

  constructor(private medicamentosService: MedicamentosService, private router: Router) {}

  onSubmit() {
    this.medicamentosService.create(this.medicamento).subscribe({
      next: () => {
        alert('✅ Medicamento registrado correctamente');
        this.router.navigate(['/admin/medicamentos']);
      },
      error: (err: any) => {
        console.error(err);
        alert('❌ Error al registrar medicamento');
      }
    });
  }
}
