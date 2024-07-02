import { inject } from '@angular/core';
import { UrlTree, Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = ():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const authService = inject(AuthService); // Inject AuthService using inject()
  const isAuthenticated = authService.getIsAuth();
  const userRole = authService.getUserRole(); // Get the user's role

  if (isAuthenticated && userRole === 'admin') {
    // Allow access if authenticated and role is admin
    return true;
  } else {
    const router = inject(Router); // Inject Router using inject()
    router.navigate(['/login']); // Redirect to login if not authorized
    return false;
  }
};