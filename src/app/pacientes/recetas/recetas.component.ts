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

  constructor(private recetasService: RecetasService) {}

  ngOnInit(): void {
    const pacienteId = 1;
    this.recetasService.getByPaciente(pacienteId).subscribe({
      next: (data) => this.recetas = data,
      error: (err) => console.error('❌ Error al cargar recetas', err)
    });
  }
}
