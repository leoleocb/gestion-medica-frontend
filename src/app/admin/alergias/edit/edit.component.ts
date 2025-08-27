import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlergiasService } from '../../../core/services/alergias.service';

@Component({
  selector: 'app-edit-alergia',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  alergia: any = {};
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alergiasService: AlergiasService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.alergiasService.getById(this.id).subscribe((data: any) => {
      this.alergia = data;
    });
  }

  onSubmit() {
    this.alergiasService.update(this.id, this.alergia).subscribe({
      next: () => {
        alert('✏️ Alergia actualizada');
        this.router.navigate(['/admin/alergias']);
      },
      error: (err: any) => {
        console.error(err);
        alert('❌ Error al actualizar alergia');
      }
    });
  }
}
