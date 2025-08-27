import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PacientesService } from '../../../core/services/pacientes.service';

@Component({
  selector: 'app-create-paciente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html'
})
export class CreateComponent {
  paciente = {
    nombre: '',
    numeroIdentificacion: '',
    fechaNacimiento: ''
  };

  constructor(private pacientesService: PacientesService, private router: Router) {}

  onSubmit() {
    this.pacientesService.create(this.paciente).subscribe({
      next: () => {
        alert('✅ Paciente creado correctamente');
        this.router.navigate(['/admin/pacientes']);
      },
      error: (err: any) => {
        console.error(err);
        alert('❌ Error al crear paciente');
      }
    });
  }
}
