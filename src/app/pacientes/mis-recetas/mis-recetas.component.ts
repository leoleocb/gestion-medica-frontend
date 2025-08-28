import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetasService } from '../../core/services/recetas.service';

@Component({
  selector: 'app-mis-recetas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-recetas.component.html',
  styleUrls: ['./mis-recetas.component.css']
})
export class MisRecetasComponent implements OnInit {
  recetas: any[] = [];
  loading = true;
  error = '';

  constructor(private recetasService: RecetasService) {}

  ngOnInit(): void {
    this.recetasService.getMisRecetas().subscribe({
      next: (res) => {
        this.recetas = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar tus recetas.';
        this.loading = false;
      }
    });
  }
}
