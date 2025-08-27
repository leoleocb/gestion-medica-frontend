import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  onLogin() {
    console.log("🔑 Iniciando login con:", this.email, this.password);

    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        console.log("✅ Login OK, backend respondió:", response);

        const token = response.token;
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

        // Obtener info de usuario y roles
        this.http.get('http://localhost:8080/api/user/me', { headers }).subscribe({
          next: (user: any) => {
            console.log("👤 Datos de usuario:", user);

            const roles = Array.isArray(user.roles) ? user.roles : [user.roles];
            this.authService.saveSession(token, roles);

            // Redirigir según rol
            if (roles.includes('ROLE_ADMIN')) {
              this.router.navigate(['/admin']);
            } else if (roles.includes('ROLE_MEDICO')) {
              this.router.navigate(['/medicos']);
            } else if (roles.includes('ROLE_PACIENTE')) {
              this.router.navigate(['/pacientes']);
            } else {
              this.router.navigate(['/auth/login']);
            }
          },
          error: (err) => {
            console.error("❌ Error obteniendo datos del usuario:", err);
            this.errorMessage = 'No se pudo obtener información del usuario';
          }
        });
      },
      error: (err) => {
        console.error('❌ Error en login', err);
        this.errorMessage = 'Credenciales inválidas';
      }
    });
  }
}
