import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasService } from '../../../core/services/citas.service';

@Component({
  selector: 'app-list-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  citas: any[] = [];

  constructor(private citasService: CitasService) {}

  ngOnInit(): void {
    const pacienteId = 1; // ⚠️ luego usar usuario logueado
    this.citasService.getByPaciente(pacienteId).subscribe({
      next: (data) => this.citas = data,
      error: (err) => console.error('❌ Error al cargar citas', err)
    });
  }
}
