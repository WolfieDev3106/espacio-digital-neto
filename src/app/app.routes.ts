import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard'; 
import { VerifyEmail } from './pages/verify-email/verify-email'; // Importa el componente de verificación


export const routes: Routes = [
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'verify-email', component: VerifyEmail }, // <-- NUEVA RUTA
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
