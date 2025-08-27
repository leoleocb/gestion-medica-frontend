import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { PacienteLayoutComponent } from './paciente-layout.component';

import { PerfilComponent } from './perfil/perfil.component';
import { ListComponent } from './citas/list/list.component';
import { ExpedienteComponent } from './expediente/expediente.component';
import { RecetasComponent } from './recetas/recetas.component';
const routes: Routes = [
  {
    path: '',
    component: PacienteLayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PACIENTE'] },
    children: [
      { path: '', redirectTo: 'perfil', pathMatch: 'full' },
      { path: 'perfil', component: PerfilComponent },
      { path: 'citas', component: ListComponent },
      { path: 'expediente', component: ExpedienteComponent },
      { path: 'recetas', component: RecetasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule {}
