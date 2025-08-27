import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicoLayoutComponent } from './medico-layout/medico-layout.component';
import { ListComponent } from './citas/list/list.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { ExpedienteComponent } from './expediente/expediente.component';
import { RecetasComponent } from './recetas/recetas.component';
const routes: Routes = [
  {
    path: '',
    component: MedicoLayoutComponent,
    children: [
      { path: 'citas', component: ListComponent },
      { path: 'pacientes', component: PacientesComponent },
      { path: 'expediente', component: ExpedienteComponent },
      { path: 'recetas', component: RecetasComponent },
      { path: '', redirectTo: 'citas', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule {}
