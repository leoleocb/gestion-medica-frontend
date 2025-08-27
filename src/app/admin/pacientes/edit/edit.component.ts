import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PacientesService } from '../../../core/services/pacientes.service';

@Component({
  selector: 'app-edit-paciente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  paciente: any = {};
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacientesService: PacientesService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.pacientesService.getById(this.id).subscribe((data: any) => {
      this.paciente = data;
    });
  }

  onSubmit() {
    this.pacientesService.update(this.id, this.paciente).subscribe({
      next: () => {
        alert('✏️ Paciente actualizado');
        this.router.navigate(['/admin/pacientes']);
      },
      error: (err: any) => {
        console.error(err);
        alert('❌ Error al actualizar paciente');
      }
    });
  }
}
