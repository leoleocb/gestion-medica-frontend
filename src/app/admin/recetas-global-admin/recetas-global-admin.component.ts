import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetasService } from '../../core/services/recetas.service';

@Component({
  selector: 'app-recetas-global-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recetas-global-admin.component.html',
  styleUrls: ['./recetas-global-admin.component.css']
})
export class RecetasGlobalAdminComponent implements OnInit {
  recetas: any[] = [];
  loading = true;
  error = '';

  constructor(private recetasService: RecetasService) {}

  ngOnInit(): void {
    this.recetasService.getAll().subscribe({
      next: (res) => {
        this.recetas = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las recetas';
        this.loading = false;
      }
    });
  }
}
