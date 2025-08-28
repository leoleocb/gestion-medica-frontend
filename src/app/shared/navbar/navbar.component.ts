import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from '../../core/services/session.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private session: SessionService, private router: Router) {}


  get roles(): string[] {
    return this.session.getRoles();
  }


  isLoggedIn(): boolean {
    return !!this.session.getToken();
  }

  isPaciente(): boolean {
    return this.roles.includes('ROLE_PACIENTE');
  }

  isMedico(): boolean {
    return this.roles.includes('ROLE_MEDICO');
  }

  isAdmin(): boolean {
    return this.roles.includes('ROLE_ADMIN');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
