import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);

  readonly user$ = authState(this.auth);

  // NUEVA FUNCIÓN DE LOGIN CON CORREO
  async loginWithEmail(email: string, password: string): Promise<string | null> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return null; // No hay error
    } catch (error: any) {
      return error.code; // Devuelve el código de error
    }
  }

  // NUEVA FUNCIÓN DE REGISTRO CON CORREO Y VERIFICACIÓN
  async registerWithEmail(email: string, password: string): Promise<string | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      // Enviamos el correo de verificación después de crear el usuario
      await sendEmailVerification(userCredential.user);
      await signOut(this.auth); // Deslogueamos al usuario para forzar la verificación
      return null; // No hay error
    } catch (error: any) {
      return error.code; // Devuelve el código de error
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  }
}