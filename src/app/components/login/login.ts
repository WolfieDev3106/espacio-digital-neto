import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/authService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  
  // Propiedad para mostrar mensajes en la vista
  message: string | null = null;
  messageType: 'success' | 'error' = 'error'; // Para dar estilos diferentes si quieres

  authService = inject(AuthService);
  router = inject(Router); // Inyectar Router

  async loginWithGoogle() {
    await this.authService.loginWithGoogle();
    // La navegación la manejará el guard o el listener de authState
  }

  async register() {
    this.message = null; // Limpiar mensaje anterior

    if (!this.email.endsWith('@tiendasneto.com')) {
      this.message = "Error: Solo se permiten correos de @tiendasneto.com.";
      this.messageType = 'error';
      return;
    }

    const error = await this.authService.registerWithEmail(this.email, this.password);
    if (error) {
      this.message = this.getFirebaseErrorMessage(error);
      this.messageType = 'error';
    } else {
      this.message = "¡Registro exitoso! Revisa tu correo electrónico para verificar tu cuenta.";
      this.messageType = 'success';
    }
  }

async login() {
    this.message = null;

    const error = await this.authService.loginWithEmail(this.email, this.password, this.rememberMe); // Pasar el valor
    console.log('Login error:', error); // Para depuración
    if (error) {
      this.message = this.getFirebaseErrorMessage(error);
      this.messageType = 'error';
    } else {
      console.log('Login successful');
      this.router.navigate(['/home']);
    }
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