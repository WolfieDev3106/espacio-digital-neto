import { Injectable, inject } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  sendPasswordResetEmail,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);

  readonly user$ = authState(this.auth);

  // NUEVA FUNCIÓN DE LOGIN CON CORREO
  async loginWithEmail(
    email: string,
    password: string,
    rememberMe: boolean
  ): Promise<string | null> {
    try {
      // Establecer la persistencia ANTES de iniciar sesión
      const persistence = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;
      await setPersistence(this.auth, persistence);

      await signInWithEmailAndPassword(this.auth, email, password);
      return null;
    } catch (error: any) {
      return error.code;
    }
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ hd: 'tiendasneto.com' });

    try {
      const userCredential = await signInWithPopup(this.auth, provider);
      // ELIMINADO: this.router.navigate(['/home']);
      return userCredential;
    } catch (error) {
      console.error('Error en el inicio de sesión con Google', error);
      return null;
    }
  }

  // NUEVA FUNCIÓN DE REGISTRO CON CORREO Y VERIFICACIÓN
  async registerWithEmail(
    email: string,
    password: string
  ): Promise<string | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
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
      console.error('Error al cerrar sesión', error);
    }
  }

  async resendVerificationEmail(): Promise<string | null> {
    const user = this.auth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(user);
        return null; // Éxito
      } catch (error: any) {
        console.error('Error reenviando la verificación', error);
        return error.code; // Fracaso
      }
    }
    return 'auth/no-current-user'; // No hay usuario para enviar
  }

  async sendPasswordReset(email: string): Promise<string | null> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return null; // Éxito
    } catch (error: any) {
      console.error('Error enviando correo de restablecimiento', error);
      return error.code; // Devuelve el código de error
    }
  }
}
