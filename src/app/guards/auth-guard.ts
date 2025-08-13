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
    // Si existe un usuario Y su correo está verificado, permitimos el acceso
    if (user && user.emailVerified) {
      return true;
    }

    // Si no, lo mandamos al login
    // Podríamos mostrar un mensaje de "verifica tu correo" en la página de login
    router.navigate(['/login']);
    return false;
  })
);
};
