import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
// Inyectamos nuestro servicio de autenticación
  authService = inject(AuthService);

  // Este método será llamado desde el botón en el HTML
  login() {
    this.authService.loginWithGoogle();
  }
}
