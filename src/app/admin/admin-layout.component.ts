import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component'; 

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <app-admin-navbar></app-admin-navbar>
    <div class="container-fluid mt-3">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AdminLayoutComponent {}
