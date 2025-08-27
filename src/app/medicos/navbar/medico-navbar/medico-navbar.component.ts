import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-medico-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './medico-navbar.component.html',
  styleUrls: ['./medico-navbar.component.css']
})
export class MedicoNavbarComponent {

  constructor(private router: Router) {}

  onLogout() {
    localStorage.removeItem('token'); // limpiar token JWT
    this.router.navigate(['/login']); // redirigir al login
  }
}
