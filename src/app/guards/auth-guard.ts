import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
 const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1), // Tomamos solo el primer valor emitido para no dejar la suscripción abierta
    map(user => {
      // Si existe un usuario, permitimos el acceso
      if (user) {
        return true;
      }
      // Si no hay usuario, redirigimos al login y denegamos el acceso
      router.navigate(['/login']);
      return false;
    })
  );
};
