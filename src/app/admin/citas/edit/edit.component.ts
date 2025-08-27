import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CitasService } from '../../../core/services/citas.service';

@Component({
  selector: 'app-edit-cita',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  cita: any = {};
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private citasService: CitasService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.citasService.getById(this.id).subscribe((data: any) => {
      this.cita = data;
    });
  }

  onSubmit() {
    this.citasService.update(this.id, this.cita).subscribe({
      next: () => {
        alert('✏️ Cita actualizada');
        this.router.navigate(['/admin/citas']);
      },
      error: (err: any) => {
        console.error(err);
        alert('❌ Error al actualizar cita');
      }
    });
  }
}
