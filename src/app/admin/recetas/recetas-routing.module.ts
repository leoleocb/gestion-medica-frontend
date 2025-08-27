import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetalleComponent } from './detalle/detalle.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
    children: [
      { path: '', component: ListComponent },
      { path: 'detalle/:id', component: DetalleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecetasRoutingModule {}
