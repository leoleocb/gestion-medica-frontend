import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesService } from '../../core/services/pacientes.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  paciente: any = {};

  constructor(private pacientesService: PacientesService) {}

  ngOnInit(): void {
    const pacienteId = 1; // ⚠️ luego se reemplaza con el id del usuario logueado
    this.pacientesService.getPerfil(pacienteId).subscribe({
      next: (data) => this.paciente = data,
      error: (err) => console.error('❌ Error al cargar perfil', err)
    });
  }
}
