// app.routes.ts

import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { VerifyEmail } from './pages/verify-email/verify-email';
import { authGuard } from './guards/auth-guard'; 
import { publicGuard } from './guards/public.guard'; // <-- 1. IMPORTA EL NUEVO GUARD

export const routes: Routes = [
  { path: 'home', component: Home, canActivate: [authGuard] },
  // 2. APLICA EL GUARD A LA RUTA DE LOGIN
  { path: 'login', component: Login, canActivate: [publicGuard] }, 
  { path: 'verify-email', component: VerifyEmail, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];