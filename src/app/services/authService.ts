import { Injectable, inject } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);

  // Observable que nos dirá en tiempo real si hay un usuario o no
  readonly user$ = authState(this.auth);

  // Función para iniciar sesión con Google
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    // Restringimos el acceso solo al dominio de la empresa
    provider.setCustomParameters({ 'hd': 'tiendasneto.com' });

    try {
      const userCredential = await signInWithPopup(this.auth, provider);
      // Si el login es exitoso, navegamos a la página principal
      this.router.navigate(['/home']);
      return userCredential;
    } catch (error) {
      console.error("Error en el inicio de sesión con Google", error);
      return null;
    }
  }

  // Función para cerrar sesión
  async logout() {
    try {
      await signOut(this.auth);
      // Al cerrar sesión, navegamos de vuelta al login
      this.router.navigate(['/login']);
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  }
}