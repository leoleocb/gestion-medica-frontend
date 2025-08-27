import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicosService } from '../../../core/services/medicos.service';

@Component({
  selector: 'app-create-medico',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html'
})
export class CreateComponent {
  medico = {
    nombre: '',
    apellido: '',
    email: '',
    especialidad: '',
    numeroLicencia: '',
    telefono: ''
  };

  constructor(private medicosService: MedicosService, private router: Router) {}

  guardarMedico() {
    this.medicosService.create(this.medico).subscribe({
      next: () => {
        alert('✅ Médico registrado correctamente');
        this.router.navigate(['/admin/medicos']);
      },
      error: (err: any) => {
        console.error('Error al registrar médico', err);
        alert('❌ Error al registrar médico');
      }
    });
  }
}
