import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Importar CommonModule
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule], // <-- Añadir CommonModule a los imports
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}