import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExpedientesService } from '../../../core/services/expedientes.service';

@Component({
  selector: 'app-detalle-expediente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  expediente: any = {};
  alergiasTexto: string = '';
  enfermedadesTexto: string = '';

  constructor(
    private route: ActivatedRoute,
    private expedientesService: ExpedientesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.expedientesService.getById(id).subscribe({
      next: (data: any) => {
        this.expediente = data;
    
        this.alergiasTexto = data.paciente?.alergias?.map((a: any) => a.nombre).join(', ') || '';
        this.enfermedadesTexto = data.paciente?.enfermedades?.map((e: any) => e.nombre).join(', ') || '';
      },
      error: (err: any) => console.error('❌ Error al cargar detalle de expediente', err)
    });
  }
}
