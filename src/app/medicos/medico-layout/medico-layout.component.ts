import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MedicoNavbarComponent } from '../navbar/medico-navbar/medico-navbar.component';

@Component({
  selector: 'app-medico-layout',
  standalone: true,
  imports: [RouterOutlet, MedicoNavbarComponent],
  template: `
    <div class="medico-layout">
      <app-medico-navbar></app-medico-navbar>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./medico-layout.component.css']
})
export class MedicoLayoutComponent {}
