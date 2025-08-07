import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "espacio-digital-tiendas-neto", appId: "1:1010964572216:web:65262ac0e4ad6791f91ecd", storageBucket: "espacio-digital-tiendas-neto.firebasestorage.app", apiKey: "AIzaSyA3nYZz5tQsP9sqemVAEBcGR9xYg9Gd7uI", authDomain: "espacio-digital-tiendas-neto.firebaseapp.com", messagingSenderId: "1010964572216", measurementId: "G-2H47SBCPVF" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
