// src/app/guards/public.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/authService'; // Asegúrate de que la ruta sea correcta

export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1), // Toma solo el primer valor para evitar suscripciones activas
    map(user => {
      // Si el usuario EXISTE (está logueado)...
      if (user) {
        // Redirígelo a la página de inicio y bloquea el acceso a la ruta actual (login)
        router.navigate(['/home']);
        return false;
      }
      
      // Si el usuario NO EXISTE (no está logueado), permítele el acceso
      return true;
    })
  );
};