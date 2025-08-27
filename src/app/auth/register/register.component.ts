import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {
    name: '',
    email: '',
    password: '',
    numeroIdentificacion: '',
    fechaNacimiento: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.form).subscribe({
      next: () => {
        alert('✅ Registro exitoso, ahora puedes iniciar sesión');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error en el registro');
      }
    });
  }
}
