import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup; // inicializado después

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.invalid) {
      this.notification.show('❌ Completa todos los campos', 'danger');
      return;
    }

    const { email, password } = this.form.value;
    this.authService.login(email!, password!).subscribe({
      next: (res) => {
        this.authService.saveSession(res.token, res.roles);
        this.notification.show('✅ Bienvenido', 'success');

        if (res.roles.includes('ROLE_ADMIN')) this.router.navigate(['/admin/dashboard']);
        else if (res.roles.includes('ROLE_MEDICO')) this.router.navigate(['/medicos/citas']);
        else this.router.navigate(['/pacientes/citas']);
      },
      error: () => this.notification.show('❌ Credenciales incorrectas', 'danger')
    });
  }
}
