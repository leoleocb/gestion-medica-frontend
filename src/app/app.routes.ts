import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  // AUTH
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },

  // ADMIN
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },

  // MÉDICOS
  {
    path: 'medicos',
    loadChildren: () =>
      import('./medicos/medicos.module').then((m) => m.MedicosModule),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_MEDICO', 'ROLE_ADMIN'] }
  },

  // PACIENTES
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./pacientes/paciente.module').then((m) => m.PacientesModule),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PACIENTE', 'ROLE_ADMIN'] }
  },


  // Rutas desconocidas
  { path: '**', redirectTo: '/auth/login' }
];
