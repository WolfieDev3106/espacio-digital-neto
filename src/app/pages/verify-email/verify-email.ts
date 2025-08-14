import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/authService'; // Ajusta la ruta
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-email.html',
  styleUrls: ['./verify-email.css'] // Asegúrate de crear este archivo de estilos
})
export class VerifyEmail implements OnInit {
  authService = inject(AuthService);
  private auth: Auth = inject(Auth);

  userEmail: string | null = null;
  message: string | null = null;
  buttonText = 'Reenviar correo de verificación';
  isButtonDisabled = false;

  ngOnInit(): void {
    this.userEmail = this.auth.currentUser?.email || null;
  }

  async resendVerification() {
    this.isButtonDisabled = true;
    this.buttonText = 'Enviando...';

    const error = await this.authService.resendVerificationEmail();

    if (error) {
      this.message = 'Ocurrió un error al reenviar el correo. Inténtalo más tarde.';
    } else {
      this.message = '¡Correo de verificación reenviado con éxito!';
    }

    // Reactiva el botón después de un tiempo
    setTimeout(() => {
      this.isButtonDisabled = false;
      this.buttonText = 'Reenviar correo de verificación';
    }, 30000); // Espera 30 segundos
  }

  logout() {
    this.authService.logout();
  }
}