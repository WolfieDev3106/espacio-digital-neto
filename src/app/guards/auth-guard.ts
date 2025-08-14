import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map(user => {
      // 1. Usuario existe y está verificado -> Permitir acceso
      if (user && user.emailVerified) {
        return true;
      }
      
      // 2. Usuario existe pero NO está verificado -> Redirigir a la página de verificación
      if (user && !user.emailVerified) {
        router.navigate(['/verify-email']);
        return false;
      }

      // 3. No hay usuario -> Redirigir a login
      router.navigate(['/login']);
      return false;
    })
  );
};