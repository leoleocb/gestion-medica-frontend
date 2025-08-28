import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpedientesService } from '../../core/services/expedientes.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-expedientes-global-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expedientes-global-admin.component.html',
  styleUrls: ['./expedientes-global-admin.component.css']
})
export class ExpedientesGlobalAdminComponent implements OnInit {
  expedientes: any[] = [];
  loading = true;

  constructor(
    private expedientesService: ExpedientesService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.cargarExpedientes();
  }

  cargarExpedientes() {
    this.expedientesService.getAll().subscribe({
      next: (res) => {
        this.expedientes = res;
        this.loading = false;
      },
      error: () => {
        this.notification.show('❌ No se pudieron cargar los expedientes', 'danger');
        this.loading = false;
      }
    });
  }
}
