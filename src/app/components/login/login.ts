import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/authService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
 authService = inject(AuthService);

  // Método para registrar un nuevo usuario
  async register() {
    // Obtenemos los valores del HTML
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const messageDisplay = document.getElementById('message-display');

    // 1. Validación de dominio
    if (messageDisplay) {
      if (!email.endsWith('@tiendasneto.com')) {
        messageDisplay.innerText = "Error: Solo se permiten correos de @tiendasneto.com.";
        return;
      }
    }

    // 2. Llamada al servicio para registrar y enviar verificación
    const error = await this.authService.registerWithEmail(email, password);
    if (error && messageDisplay) {
      messageDisplay.innerText = `Error: ${this.getFirebaseErrorMessage(error)}`;
    } else if (messageDisplay) {
      messageDisplay.innerText = "¡Registro exitoso! Revisa tu correo electrónico para verificar tu cuenta.";
    }
  }

  // Método para iniciar sesión
  async login() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const messageDisplay = document.getElementById('message-display');

    const error = await this.authService.loginWithEmail(email, password);
    if (error && messageDisplay) {
       messageDisplay.innerText = `Error: ${this.getFirebaseErrorMessage(error)}`;
    }
    // Si el login es exitoso, el AuthGuard y el AuthService se encargarán de la redirección.
  }

  // Función para traducir errores de Firebase a mensajes amigables
  private getFirebaseErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Este correo electrónico ya está registrado.';
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';
      case 'auth/user-not-found':
        return 'No se encontró un usuario con este correo.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      default:
        return 'Ocurrió un error inesperado. Inténtalo de nuevo.';
    }
  }
}