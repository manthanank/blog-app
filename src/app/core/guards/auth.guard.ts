import { inject } from '@angular/core';
import { UrlTree, Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = ():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const authService = inject(AuthService); // Inject AuthService using inject()
  const isAuthenticated = authService.getIsAuth();

  if (isAuthenticated) {
    return true;
  } else {
    const router = inject(Router); // Inject Router using inject()
    router.navigate(['/login']);
    return false;
  }
};
