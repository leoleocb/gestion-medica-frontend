import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paciente-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './paciente-navbar.component.html',
  styleUrls: ['./paciente-navbar.component.css']
})
export class PacienteNavbarComponent {}
