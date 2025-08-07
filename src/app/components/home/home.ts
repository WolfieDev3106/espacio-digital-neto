import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para *ngIf y async
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
 authService = inject(AuthService);
  // Exponemos el observable del usuario al template
  user$ = this.authService.user$; 
}
