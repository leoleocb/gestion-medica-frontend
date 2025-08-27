import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecetasService } from '../../../core/services/recetas.service';
@Component({
  selector: 'app-detalle-receta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  receta: any = {};

  constructor(
    private route: ActivatedRoute,
    private recetasService: RecetasService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recetasService.getById(id).subscribe({
      next: (data: any) => { this.receta = data; },
      error: (err: any) => console.error('❌ Error al cargar receta', err)
    });
  }
}
