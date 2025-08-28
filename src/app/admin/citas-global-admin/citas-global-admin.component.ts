import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasService } from '../../core/services/citas.service';

@Component({
  selector: 'app-citas-global-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citas-global-admin.component.html',
  styleUrls: ['./citas-global-admin.component.css']
})
export class CitasGlobalAdminComponent implements OnInit {
  citas: any[] = [];
  loading = true;
  error = '';

  constructor(private citasService: CitasService) {}

  ngOnInit(): void {
    this.citasService.getAll().subscribe({
      next: (res) => {
        this.citas = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las citas';
        this.loading = false;
      }
    });
  }
}
