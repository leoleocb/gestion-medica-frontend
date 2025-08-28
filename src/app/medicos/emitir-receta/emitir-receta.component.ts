import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetasService } from '../../core/services/recetas.service';
import { MedicamentosService } from '../../core/services/medicamentos.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-emitir-receta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './emitir-receta.component.html',
  styleUrls: ['./emitir-receta.component.css']
})
export class EmitirRecetaComponent {
  pacienteId: number;
  medicamentos: any[] = [];
  recetaItems: { medicamentoId: number; dosis: string; frecuencia: string }[] = [];

  mensaje = '';
  error = '';

  constructor(
    private recetasService: RecetasService,
    private medicamentosService: MedicamentosService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService
  ) {
    this.pacienteId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.medicamentosService.getAll().subscribe({
      next: (res) => (this.medicamentos = res),
      error: () => (this.error = 'No se pudieron cargar los medicamentos')
    });
  }

  agregarItem() {
    this.recetaItems.push({ medicamentoId: 0, dosis: '', frecuencia: '' });
  }

  eliminarItem(index: number) {
    this.recetaItems.splice(index, 1);
  }

  guardarReceta() {
    if (this.recetaItems.length === 0) {
      this.notification.show('❌ Debe agregar al menos un medicamento', 'danger');
      return;
    }

    const receta = {
      paciente: { id: this.pacienteId },
      items: this.recetaItems.map((i) => ({
        medicamento: { id: i.medicamentoId },
        dosis: i.dosis,
        frecuencia: i.frecuencia
      }))
    };

    this.recetasService.createReceta(this.pacienteId, receta).subscribe({
      next: () => {
        this.notification.show('✅ Receta emitida correctamente', 'success');
        setTimeout(() => this.router.navigate(['/medicos/citas']), 1500);
      },
      error: (err) => {
         this.notification.show(err.error?.error || '❌ No se pudo emitir la receta', 'danger');
      }
    });
  }
}
