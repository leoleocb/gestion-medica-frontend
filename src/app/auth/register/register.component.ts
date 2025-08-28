import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numeroIdentificacion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl) {
    const pass = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  registrar() {
    if (this.form.invalid) {
      this.notification.show('❌ Revisa los campos del formulario', 'danger');
      return;
    }

    const data = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      numeroIdentificacion: this.form.value.numeroIdentificacion,
      fechaNacimiento: this.form.value.fechaNacimiento
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.notification.show('✅ Registro exitoso. Ahora inicia sesión.', 'success');
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: (err) => {
        this.notification.show(err.error?.message || '❌ Error al registrar usuario', 'danger');
      }
    });
  }
}
