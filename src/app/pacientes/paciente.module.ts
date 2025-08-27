import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesRoutingModule } from './pacientes-routing.module';

// Importar standalone components
import { PacienteLayoutComponent } from './paciente-layout.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ListComponent } from './citas/list/list.component';
import { ExpedienteComponent } from './expediente/expediente.component';
import { RecetasComponent } from './recetas/recetas.component';

@NgModule({
  imports: [
    CommonModule,
    PacientesRoutingModule,

    // 👇 standalone components aquí
    PacienteLayoutComponent,
    PerfilComponent,
    ListComponent,
    ExpedienteComponent,
    RecetasComponent
  ]
})
export class PacientesModule {}
