import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasService } from '../../core/services/citas.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css']
})
export class MisCitasComponent implements OnInit {
  citas: any[] = [];
  loading = true;

  constructor(
    private citasService: CitasService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas() {
    this.loading = true;
    this.citasService.getMisCitas().subscribe({
      next: (res) => {
        this.citas = res;
        this.loading = false;
      },
      error: () => {
        this.notification.show('❌ No se pudieron cargar tus citas', 'danger');
        this.loading = false;
      }
    });
  }

  cancelarCita(id: number) {
    if (confirm('¿Seguro que deseas cancelar esta cita?')) {
      this.citasService.delete(id).subscribe({
        next: () => {
          this.notification.show('✅ Cita cancelada correctamente', 'success');
          this.cargarCitas();
        },
        error: (err) => {
          this.notification.show(err.error?.error || '❌ No se pudo cancelar la cita', 'danger');
        }
      });
    }
  }
}
