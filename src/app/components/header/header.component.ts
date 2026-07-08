import { Component } from '@angular/core';
import { BrandLogoComponent } from './brand-logo.component';
import { NavMenuComponent } from './nav-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BrandLogoComponent, NavMenuComponent],
  template: `
    <header class="bg-gray-800 text-white shadow-md">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <app-brand-logo />
          
          <!-- Mobile menu button -->
          <button 
            (click)="toggleMenu()"
            class="md:hidden p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            [attr.aria-expanded]="isMenuOpen"
            aria-controls="mobile-menu"
            aria-label="Main menu"
          >
            <svg 
              class="w-6 h-6" 
              [class.hidden]="isMenuOpen" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              class="w-6 h-6" 
              [class.hidden]="!isMenuOpen" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Desktop menu -->
          <div class="hidden md:block">
            <app-nav-menu />
          </div>
        </div>

        <!-- Mobile menu -->
        <div 
          id="mobile-menu"
          [class.hidden]="!isMenuOpen"
          class="md:hidden"
        >
          <app-nav-menu [isMobile]="true" (menuClosed)="toggleMenu()" />
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}