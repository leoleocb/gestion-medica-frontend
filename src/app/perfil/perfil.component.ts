import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilService } from '../core/services/perfil.service';
import { NotificationService } from '../core/services/notification.service';
import { SessionService } from '../core/services/session.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfil: any = {};
  actual = '';
  nueva = '';

  // para mostrar alertas en el propio componente
  perfilMessage: string | null = null;
  perfilMessageType: 'success' | 'danger' | null = null;

  constructor(
    private perfilService: PerfilService,
    private notification: NotificationService,
    private session: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.perfilService.getPerfil().subscribe({
      next: (res) => (this.perfil = res),
      error: () => {
        this.notification.show('❌ Error al cargar perfil', 'danger');
        this.perfilMessage = '❌ Error al cargar perfil';
        this.perfilMessageType = 'danger';
      }
    });
  }

  cambiarPassword() {
    if (!this.actual || !this.nueva) {
      this.notification.show('❌ Completa ambos campos', 'danger');
      this.perfilMessage = '❌ Completa ambos campos';
      this.perfilMessageType = 'danger';
      return;
    }

    this.perfilService.cambiarPassword(this.actual, this.nueva).subscribe({
      next: (res) => {
        const msg = res.message || '✅ Contraseña actualizada correctamente';
        this.notification.show(msg, 'success');
        this.perfilMessage = msg;
        this.perfilMessageType = 'success';
        this.logout(); // forzar logout tras cambiar contraseña
      },
      error: (err) => {
        const msg = err.error?.message || '❌ No se pudo actualizar la contraseña';
        this.notification.show(msg, 'danger');
        this.perfilMessage = msg;
        this.perfilMessageType = 'danger';
      }
    });
  }

  logout() {
    this.session.clear(); // limpia token y roles
    this.router.navigate(['/auth/login']);
  }
}
