import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PacienteNavbarComponent } from './navbar/paciente-navbar.component';

@Component({
  selector: 'app-paciente-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PacienteNavbarComponent],
  template: `
    <app-paciente-navbar></app-paciente-navbar>
    <div class="container-fluid mt-3">
      <router-outlet></router-outlet>
    </div>
  `
})
export class PacienteLayoutComponent {}
