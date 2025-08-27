import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EnfermedadesService } from '../../../core/services/enfermedades.service';

@Component({
  selector: 'app-create-enfermedad',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html'
})
export class CreateComponent {
  enfermedad = { nombre: '', descripcion: '' };

  constructor(private enfermedadesService: EnfermedadesService, private router: Router) {}

  onSubmit() {
    this.enfermedadesService.create(this.enfermedad).subscribe({
      next: () => {
        alert('✅ Enfermedad registrada correctamente');
        this.router.navigate(['/admin/enfermedades']);
      },
      error: (err: any) => {
        console.error(err);
        alert('❌ Error al registrar enfermedad');
      }
    });
  }
}
