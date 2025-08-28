import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetasService } from '../../core/services/recetas.service';

@Component({
  selector: 'app-mis-recetas-medico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-recetas-medico.component.html',
  styleUrls: ['./mis-recetas-medico.component.css']
})
export class MisRecetasMedicoComponent implements OnInit {
  recetas: any[] = [];
  error = '';
  loading = true;

  constructor(private recetasService: RecetasService) {}

  ngOnInit(): void {
    this.recetasService.getMisRecetasMedico().subscribe({
      next: (res) => {
        this.recetas = res;
        this.loading = false;
      },
      error: () => {
        this.error = '❌ No se pudieron cargar tus recetas emitidas';
        this.loading = false;
      }
    });
  }
}
