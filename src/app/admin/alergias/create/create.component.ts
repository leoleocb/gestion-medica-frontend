import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlergiasService } from '../../../core/services/alergias.service';

@Component({
  selector: 'app-create-alergia',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html'
})
export class CreateComponent {
  alergia = { nombre: '', descripcion: '' };

  constructor(private alergiasService: AlergiasService, private router: Router) {}

  onSubmit() {
    this.alergiasService.create(this.alergia).subscribe({
      next: () => {
        alert('✅ Alergia registrada correctamente');
        this.router.navigate(['/admin/alergias']);
      },
      error: (err: any) => {
        console.error(err);
        alert('❌ Error al registrar alergia');
      }
    });
  }
}
