import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { AuthService } from './services/authService'; // Ajusta la ruta
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('espacio-digital-neto');
 private authService = inject(AuthService);

  showNavbar$: Observable<boolean>;
   constructor() {
    this.showNavbar$ = this.authService.user$.pipe(
      map(user => user ? user.emailVerified : false)
    );
  }
  
}
