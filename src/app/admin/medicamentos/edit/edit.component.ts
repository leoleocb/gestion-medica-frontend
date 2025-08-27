import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MedicamentosService } from '../../../core/services/medicamentos.service';

@Component({
  selector: 'app-edit-medicamento',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  medicamento: any = {};
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicamentosService: MedicamentosService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.medicamentosService.getById(this.id).subscribe((data: any) => {
      this.medicamento = data;
    });
  }

  onSubmit() {
    this.medicamentosService.update(this.id, this.medicamento).subscribe({
      next: () => {
        alert('✏️ Medicamento actualizado');
        this.router.navigate(['/admin/medicamentos']);
      },
      error: (err: any) => {
        console.error(err);
        alert('❌ Error al actualizar medicamento');
      }
    });
  }
}
