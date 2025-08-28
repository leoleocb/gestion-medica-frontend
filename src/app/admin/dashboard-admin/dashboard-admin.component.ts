import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesService } from '../../core/services/pacientes.service';
import { MedicosService } from '../../core/services/medicos.service';
import { CitasService } from '../../core/services/citas.service';
import { RecetasService } from '../../core/services/recetas.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  totalPacientes = 0;
  totalMedicos = 0;
  totalCitas = 0;
  totalRecetas = 0;
  loading = true;

  constructor(
    private pacientesService: PacientesService,
    private medicosService: MedicosService,
    private citasService: CitasService,
    private recetasService: RecetasService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.loading = true;

    this.pacientesService.getAll().subscribe(res => this.totalPacientes = res.length);
    this.medicosService.getAll().subscribe(res => this.totalMedicos = res.length);
    this.citasService.getAll().subscribe(res => this.totalCitas = res.length);
    this.recetasService.getAll().subscribe(res => this.totalRecetas = res.length);

    this.loading = false;
  }
}
