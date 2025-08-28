import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';   
import { CitasService } from '../../core/services/citas.service';

@Component({
  selector: 'app-citas-medico',
  standalone: true,
  imports: [CommonModule, RouterLink],  
  templateUrl: './citas-medico.component.html',
  styleUrls: ['./citas-medico.component.css']
})
export class CitasMedicoComponent implements OnInit {
  citas: any[] = [];
  loading = true;
  error = '';

  constructor(private citasService: CitasService) {}

  ngOnInit(): void {
    this.citasService.getMisCitasMedico().subscribe({
      next: (res) => {
        this.citas = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las citas asignadas.';
        this.loading = false;
      }
    });
  }
}
