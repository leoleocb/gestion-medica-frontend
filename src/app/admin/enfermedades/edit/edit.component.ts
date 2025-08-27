import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EnfermedadesService } from '../../../core/services/enfermedades.service';

@Component({
  selector: 'app-edit-enfermedad',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  enfermedad: any = {};
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enfermedadesService: EnfermedadesService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.enfermedadesService.getById(this.id).subscribe((data: any) => {
      this.enfermedad = data;
    });
  }

  onSubmit() {
    this.enfermedadesService.update(this.id, this.enfermedad).subscribe({
      next: () => {
        alert('✏️ Enfermedad actualizada');
        this.router.navigate(['/admin/enfermedades']);
      },
      error: (err: any) => {
        console.error(err);
        alert('❌ Error al actualizar enfermedad');
      }
    });
  }
}
