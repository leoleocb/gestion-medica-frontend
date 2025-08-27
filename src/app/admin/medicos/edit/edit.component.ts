import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MedicosService } from '../../../core/services/medicos.service';

@Component({
  selector: 'app-edit-medico',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  medico: any = {};
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicosService: MedicosService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.medicosService.getById(this.id).subscribe((data: any) => {
      this.medico = data;
    });
  }

  onSubmit() {
    this.medicosService.update(this.id, this.medico).subscribe({
      next: () => {
        alert('✏️ Médico actualizado');
        this.router.navigate(['/admin/medicos']);
      },
      error: (err: any) => {
        console.error(err);
        alert('❌ Error al actualizar médico');
      }
    });
  }
}
