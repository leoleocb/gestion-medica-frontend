import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');

    if (!token) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    const requiredRoles: string[] = route.data['roles'] || [];

    if (requiredRoles.length > 0 && !roles.some((r: string) => requiredRoles.includes(r))) {
      console.warn("⚠️ Rol no autorizado");
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
