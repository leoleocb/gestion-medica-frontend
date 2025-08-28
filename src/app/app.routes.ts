import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // HOME y AYUDA (públicas)
  { path: '', loadComponent: () => import('./shared/home/home.component').then(m => m.HomeComponent) },
  { path: 'home', loadComponent: () => import('./shared/home/home.component').then(m => m.HomeComponent) },
  { path: 'ayuda', loadComponent: () => import('./shared/ayuda/ayuda.component').then(m => m.AyudaComponent) },

  // PACIENTE
  {
    path: 'pacientes',
    loadComponent: () => import('./pacientes/pacientes.component').then(m => m.PacientesComponent),
    canActivate: [authGuard],
    data: { roles: ['ROLE_PACIENTE'] },
    children: [
      { path: 'citas', loadComponent: () => import('./pacientes/mis-citas/mis-citas.component').then(m => m.MisCitasComponent) },
      { path: 'nueva-cita', loadComponent: () => import('./pacientes/nueva-cita/nueva-cita.component').then(m => m.NuevaCitaComponent) },
      { path: 'expediente', loadComponent: () => import('./pacientes/expediente-paciente/expediente-paciente.component').then(m => m.ExpedientePacienteComponent) },
      { path: 'recetas', loadComponent: () => import('./pacientes/mis-recetas/mis-recetas.component').then(m => m.MisRecetasComponent) }
    ]
  },

  // MÉDICO
{
  path: 'medicos',
  loadComponent: () => import('./medicos/medicos.component').then(m => m.MedicosComponent),
  canActivate: [authGuard],
  data: { roles: ['ROLE_MEDICO'] },
  children: [
    { path: 'citas', loadComponent: () => import('./medicos/citas-medico/citas-medico.component').then(m => m.CitasMedicoComponent) },
    { path: 'pacientes', loadComponent: () => import('./medicos/pacientes-medico/pacientes-medico.component').then(m => m.PacientesMedicoComponent) },
    { path: 'expediente/:id', loadComponent: () => import('./medicos/expediente-paciente-medico/expediente-paciente-medico.component').then(m => m.ExpedientePacienteMedicoComponent) },
    { path: 'atender/:id', loadComponent: () => import('./medicos/atender-paciente/atender-paciente.component').then(m => m.AtenderPacienteComponent) },
    { path: 'recetas/:id', loadComponent: () => import('./medicos/emitir-receta/emitir-receta.component').then(m => m.EmitirRecetaComponent) },
    { path: 'mis-recetas', loadComponent: () => import('./medicos/mis-recetas-medico/mis-recetas-medico.component').then(m => m.MisRecetasMedicoComponent) },
    { path: 'condiciones/:id', loadComponent: () => import('./medicos/asignar-condiciones/asignar-condiciones.component').then(m => m.AsignarCondicionesComponent) }
  ]
},

  // ADMIN
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard],
    data: { roles: ['ROLE_ADMIN'] },
    children: [
      { path: 'dashboard', loadComponent: () => import('./admin/dashboard-admin/dashboard-admin.component').then(m => m.DashboardAdminComponent) },
      { path: 'medicos', loadComponent: () => import('./admin/medicos-admin/medicos-admin.component').then(m => m.MedicosAdminComponent) },
      { path: 'pacientes', loadComponent: () => import('./admin/pacientes-admin/pacientes-admin.component').then(m => m.PacientesAdminComponent) },
      { path: 'medicamentos', loadComponent: () => import('./admin/medicamentos-admin/medicamentos-admin.component').then(m => m.MedicamentosAdminComponent) },
      { path: 'usuarios', loadComponent: () => import('./admin/usuarios-admin/usuarios-admin.component').then(m => m.UsuariosAdminComponent) },
      { path: 'citas', loadComponent: () => import('./admin/citas-global-admin/citas-global-admin.component').then(m => m.CitasGlobalAdminComponent) },
      { path: 'expedientes', loadComponent: () => import('./admin/expedientes-global-admin/expedientes-global-admin.component').then(m => m.ExpedientesGlobalAdminComponent) },
      { path: 'recetas', loadComponent: () => import('./admin/recetas-global-admin/recetas-global-admin.component').then(m => m.RecetasGlobalAdminComponent) },
      { path: 'configuracion', loadComponent: () => import('./admin/configuracion-admin/configuracion-admin.component').then(m => m.ConfiguracionAdminComponent) },
      { path: 'alergias', loadComponent: () => import('./admin/alergias-admin/alergias-admin.component').then(m => m.AlergiasAdminComponent) },
      { path: 'enfermedades', loadComponent: () => import('./admin/enfermedades-admin/enfermedades-admin.component').then(m => m.EnfermedadesAdminComponent) }
    ]
  },

  // AUTH
  { path: 'auth/login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'auth/register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },

  // ERROR 403
  { path: 'forbidden', loadComponent: () => import('./shared/forbidden.component').then(m => m.ForbiddenComponent) },

  // NOT FOUND
  { path: '**', loadComponent: () => import('./shared/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
