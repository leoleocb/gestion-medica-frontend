import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpedientesService } from '../../core/services/expedientes.service';

@Component({
  selector: 'app-expediente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedienteComponent implements OnInit {
  expediente: any = {};

  constructor(private expedientesService: ExpedientesService) {}

  ngOnInit(): void {
    const pacienteId = 1;
    this.expedientesService.getByPaciente(pacienteId).subscribe({
      next: (data) => this.expediente = data,
      error: (err) => console.error('❌ Error al cargar expediente', err)
    });
  }
}
