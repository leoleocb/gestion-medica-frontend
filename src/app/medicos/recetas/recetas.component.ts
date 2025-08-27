import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetasService } from '../../core/services/recetas.service';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {
  recetas: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private recetasService: RecetasService) {}

  ngOnInit(): void {
    this.loadRecetas();
  }

  loadRecetas() {
    this.recetasService.getAll().subscribe({
      next: (data) => {
        this.recetas = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las recetas';
        this.loading = false;
      }
    });
  }
}
