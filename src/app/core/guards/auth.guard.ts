import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    const roles = this.authService.getUserRoles();

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
