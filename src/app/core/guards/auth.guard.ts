import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';

export const authGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionService);
  const router = inject(Router);

  // 1. Verificar si hay sesión
  if (!session.getToken()) {
    router.navigate(['/auth/login']);
    return false;
  }

  const requiredRoles = route.data?.['roles'] as string[];
  if (requiredRoles && requiredRoles.length > 0) {
    const userRoles = session.getRoles();
    const autorizado = requiredRoles.some(r => userRoles.includes(r));

    if (!autorizado) {
      router.navigate(['/forbidden']); 
      return false;
    }
  }

  return true;
};
