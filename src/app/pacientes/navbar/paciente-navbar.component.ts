import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paciente-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './paciente-navbar.component.html',
  styleUrls: ['./paciente-navbar.component.css']
})
export class PacienteNavbarComponent {

  constructor(private router: Router) {}

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.router.navigate(['/auth/login']);
  }
}
