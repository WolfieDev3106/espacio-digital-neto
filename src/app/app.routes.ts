import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard'; // <-- Importamos el guardia


export const routes: Routes = [
  { path: 'home', component: Home, canActivate: [authGuard] }, // <-- Ruta protegida
  { path: 'login', component: Login },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
