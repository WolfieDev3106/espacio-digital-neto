// login.ts
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/authService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  message: string | null = null;
  messageType: 'success' | 'error' = 'error';

  // NUEVA VARIABLE DE ESTADO
  isRegistering: boolean = false;

  authService = inject(AuthService);
  router = inject(Router);

  // NUEVO MÉTODO PARA CAMBIAR DE MODO
  toggleAuthMode(): void {
    this.isRegistering = !this.isRegistering;
    this.message = null; // Limpiar mensajes al cambiar de modo
  }

  // NUEVO MÉTODO ÚNICO PARA EL SUBMIT DEL FORMULARIO
  async onSubmit(): Promise<void> {
    if (this.isRegistering) {
      await this.register();
    } else {
      await this.login();
    }
  }

  async loginWithGoogle() {
    await this.authService.loginWithGoogle();
    // La navegación la sigue manejando el auth-guard
  }

  // El método de registro ahora es privado, ya que se llama desde onSubmit
  private async register() {
    this.message = null;

    if (!this.email.endsWith('@tiendasneto.com')) {
      this.message = 'Error: Solo se permiten correos de @tiendasneto.com.';
      this.messageType = 'error';
      return;
    }

    const error = await this.authService.registerWithEmail(
      this.email,
      this.password
    );
    if (error) {
      this.message = this.getFirebaseErrorMessage(error);
      this.messageType = 'error';
    } else {
      this.message =
        '¡Registro exitoso! Revisa tu correo electrónico para verificar tu cuenta.';
      this.messageType = 'success';
      // Cambiamos a modo login para que el usuario pueda iniciar sesión después de verificar
      this.isRegistering = false;
    }
  }

  // El método de login ahora es privado
  private async login() {
    this.message = null;

    if (!this.email.endsWith('@tiendasneto.com')) {
      this.message = 'Error: Solo se permiten correos de @tiendasneto.com.';
      this.messageType = 'error';
      return;
    }

    const error = await this.authService.loginWithEmail(
      this.email,
      this.password,
      this.rememberMe
    );
    console.error('Firebase Auth Error:', error);
    if (error) {
      this.message = this.getFirebaseErrorMessage(error);
      this.messageType = 'error';
    } else {
      // Navegación exitosa, el auth-guard se encargará del resto
      this.router.navigate(['/home']);
    }
  }

  async forgotPassword() {
    this.message = null; // Limpia mensajes previos
    if (!this.email) {
      this.message = "Por favor, ingresa tu correo para restablecer la contraseña.";
      this.messageType = 'error';
      return;
    }

    // Llamamos al nuevo método en el servicio
    const error = await this.authService.sendPasswordReset(this.email);
    
    if (error) {
      this.message = "No se pudo enviar el correo. Verifica que el email sea correcto.";
      this.messageType = 'error';
    } else {
      this.message = "Se ha enviado un enlace de restablecimiento a tu correo electrónico.";
      this.messageType = 'success';
    }
  }

  private getFirebaseErrorMessage(errorCode: string): string {
    // Mensajes más claros y amigables
    switch (errorCode) {
      // NUEVO CASO PARA EL LOGIN
      case 'auth/invalid-credential':
        return 'El correo o la contraseña son incorrectos. Por favor, verifica tus credenciales y que ya estes registrado.';

      // CASOS ÚTILES PARA EL REGISTRO
      case 'auth/email-already-in-use':
        return 'Este correo electrónico ya está registrado. Intenta iniciar sesión.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';

      // CASO POR DEFECTO
      default:
        return 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
    }
  }
}
