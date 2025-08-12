import { Component, inject, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  authService = inject(AuthService);
  user$ = this.authService.user$;

  private revealOnScroll = () => {
    const revealSections = document.querySelectorAll('.reveal-section');
    revealSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        section.classList.add('visible');
      }
    });
  };

  ngAfterViewInit() {
    window.addEventListener('scroll', this.revealOnScroll);
    this.revealOnScroll();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.revealOnScroll);
  }
}