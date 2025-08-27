import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportesComponent } from './reportes/reportes.component';
import { AdminLayoutComponent } from './admin-layout.component'; // 👈 importamos el layout

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,   // 👈 usamos el layout
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'reportes', component: ReportesComponent },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {
        path: 'pacientes',
        loadChildren: () =>
          import('./pacientes/pacientes.module').then(m => m.PacientesModule)
      },
      {
        path: 'medicos',
        loadChildren: () =>
          import('./medicos/medicos.module').then(m => m.MedicosModule)
      },
      {
        path: 'citas',
        loadChildren: () =>
          import('./citas/citas.module').then(m => m.CitasModule)
      },
      {
        path: 'expedientes',
        loadChildren: () =>
          import('./expedientes/expedientes.module').then(m => m.ExpedientesModule)
      },
      {
        path: 'recetas',
        loadChildren: () =>
          import('./recetas/recetas.module').then(m => m.RecetasModule)
      },
      {
        path: 'medicamentos',
        loadChildren: () =>
          import('./medicamentos/medicamentos.module').then(m => m.MedicamentosModule)
      },
      {
        path: 'enfermedades',
        loadChildren: () =>
          import('./enfermedades/enfermedades.module').then(m => m.EnfermedadesModule)
      },
      {
        path: 'alergias',
        loadChildren: () =>
          import('./alergias/alergias.module').then(m => m.AlergiasModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
